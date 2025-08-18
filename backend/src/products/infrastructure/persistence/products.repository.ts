import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { products } from '../../domain/products';

export abstract class productsRepository {
  abstract create(
    data: Omit<products, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<products>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<products[]>;

  abstract findById(id: products['id']): Promise<NullableType<products>>;

  abstract findByIds(ids: products['id'][]): Promise<products[]>;

  abstract update(
    id: products['id'],
    payload: DeepPartial<products>,
  ): Promise<products | null>;

  abstract remove(id: products['id']): Promise<void>;
}
