import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ordersEntity } from '../entities/orders.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { orders } from '../../../../domain/orders';
import { ordersRepository } from '../../orders.repository';
import { ordersMapper } from '../mappers/orders.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ordersRelationalRepository implements ordersRepository {
  constructor(
    @InjectRepository(ordersEntity)
    private readonly ordersRepository: Repository<ordersEntity>,
  ) {}

  async create(data: orders): Promise<orders> {
    const persistenceModel = ordersMapper.toPersistence(data);
    const newEntity = await this.ordersRepository.save(
      this.ordersRepository.create(persistenceModel),
    );
    return ordersMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<orders[]> {
    const entities = await this.ordersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ordersMapper.toDomain(entity));
  }

  async findById(id: orders['id']): Promise<NullableType<orders>> {
    const entity = await this.ordersRepository.findOne({
      where: { id },
    });

    return entity ? ordersMapper.toDomain(entity) : null;
  }

  async findByIds(ids: orders['id'][]): Promise<orders[]> {
    const entities = await this.ordersRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ordersMapper.toDomain(entity));
  }

  async update(id: orders['id'], payload: Partial<orders>): Promise<orders> {
    const entity = await this.ordersRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.ordersRepository.save(
      this.ordersRepository.create(
        ordersMapper.toPersistence({
          ...ordersMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ordersMapper.toDomain(updatedEntity);
  }

  async remove(id: orders['id']): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
