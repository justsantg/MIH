import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { orders } from '../../domain/orders';

export abstract class ordersRepository {
  abstract create(
    data: Omit<orders, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<orders>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<orders[]>;

  abstract findById(id: orders['id']): Promise<NullableType<orders>>;

  abstract findByIds(ids: orders['id'][]): Promise<orders[]>;

  abstract update(
    id: orders['id'],
    payload: DeepPartial<orders>,
  ): Promise<orders | null>;

  abstract remove(id: orders['id']): Promise<void>;
}
