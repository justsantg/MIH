import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { categories } from '../../domain/categories';

export abstract class categoriesRepository {
  abstract create(
    data: Omit<categories, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<categories>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<categories[]>;

  abstract findById(id: categories['id']): Promise<NullableType<categories>>;

  abstract findByIds(ids: categories['id'][]): Promise<categories[]>;

  abstract update(
    id: categories['id'],
    payload: DeepPartial<categories>,
  ): Promise<categories | null>;

  abstract remove(id: categories['id']): Promise<void>;
}
