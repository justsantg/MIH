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
    private readonly ormRepository: Repository<categoriesEntity>, // 👈 renombrado para evitar confusión
  ) {}

  async create(data: categories): Promise<categories> {
    const persistenceModel = categoriesMapper.toPersistence(data);
    const newEntity = await this.ormRepository.save(
      this.ormRepository.create(persistenceModel),
    );
    return categoriesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<categories[]> {
    const entities = await this.ormRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: ['products'], // 👈 incluimos productos
    });

    return entities.map((entity) => categoriesMapper.toDomain(entity));
  }

  async findById(id: categories['id']): Promise<NullableType<categories>> {
    const entity = await this.ormRepository.findOne({
      where: { id },
      relations: ['products'], // 👈 incluimos productos
    });

    return entity ? categoriesMapper.toDomain(entity) : null;
  }

  async findByIds(ids: categories['id'][]): Promise<categories[]> {
    const entities = await this.ormRepository.find({
      where: { id: In(ids) },
      relations: ['products'], // 👈 incluimos productos
    });

    return entities.map((entity) => categoriesMapper.toDomain(entity));
  }

  async update(
    id: categories['id'],
    payload: Partial<categories>,
  ): Promise<categories> {
    const entity = await this.ormRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.ormRepository.save(
      this.ormRepository.create(
        categoriesMapper.toPersistence({
          ...categoriesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return categoriesMapper.toDomain(updatedEntity);
  }

  async remove(id: categories['id']): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
