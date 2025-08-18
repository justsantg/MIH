import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { categoriesEntity } from '../entities/categories.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { categories } from '../../../../domain/categories';
import { categoriesRepository } from '../../categories.repository';
import { categoriesMapper } from '../mappers/categories.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class categoriesRelationalRepository implements categoriesRepository {
  constructor(
    @InjectRepository(categoriesEntity)
    private readonly categoriesRepository: Repository<categoriesEntity>,
  ) {}

  async create(data: categories): Promise<categories> {
    const persistenceModel = categoriesMapper.toPersistence(data);
    const newEntity = await this.categoriesRepository.save(
      this.categoriesRepository.create(persistenceModel),
    );
    return categoriesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<categories[]> {
    const entities = await this.categoriesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => categoriesMapper.toDomain(entity));
  }

  async findById(id: categories['id']): Promise<NullableType<categories>> {
    const entity = await this.categoriesRepository.findOne({
      where: { id },
    });

    return entity ? categoriesMapper.toDomain(entity) : null;
  }

  async findByIds(ids: categories['id'][]): Promise<categories[]> {
    const entities = await this.categoriesRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => categoriesMapper.toDomain(entity));
  }

  async update(
    id: categories['id'],
    payload: Partial<categories>,
  ): Promise<categories> {
    const entity = await this.categoriesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.categoriesRepository.save(
      this.categoriesRepository.create(
        categoriesMapper.toPersistence({
          ...categoriesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return categoriesMapper.toDomain(updatedEntity);
  }

  async remove(id: categories['id']): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
