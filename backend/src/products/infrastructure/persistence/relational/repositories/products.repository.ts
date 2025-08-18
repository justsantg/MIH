import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ProductsEntity } from '../entities/products.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { products } from '../../../../domain/products';
import { productsRepository } from '../../products.repository';
import { productsMapper } from '../mappers/products.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class productsRelationalRepository implements productsRepository {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
  ) {}

  async create(data: products): Promise<products> {
    const persistenceModel = productsMapper.toPersistence(data);
    const newEntity = await this.productsRepository.save(
      this.productsRepository.create(persistenceModel),
    );
    return productsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<products[]> {
    const entities = await this.productsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => productsMapper.toDomain(entity));
  }

  async findById(id: products['id']): Promise<NullableType<products>> {
    const entity = await this.productsRepository.findOne({
      where: { id },
    });

    return entity ? productsMapper.toDomain(entity) : null;
  }

  async findByIds(ids: products['id'][]): Promise<products[]> {
    const entities = await this.productsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => productsMapper.toDomain(entity));
  }

  async update(
    id: products['id'],
    payload: Partial<products>,
  ): Promise<products> {
    const entity = await this.productsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.productsRepository.save(
      this.productsRepository.create(
        productsMapper.toPersistence({
          ...productsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return productsMapper.toDomain(updatedEntity);
  }

  async remove(id: products['id']): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
