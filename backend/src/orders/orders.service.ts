import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateordersDto } from './dto/create-orders.dto';
import { UpdateordersDto } from './dto/update-orders.dto';
import { ordersRepository } from './infrastructure/persistence/orders.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { orders } from './domain/orders';

@Injectable()
export class ordersService {
  constructor(
    // Dependencies here
    private readonly ordersRepository: ordersRepository,
  ) {}

  async create(createordersDto: CreateordersDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.ordersRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      deletedAt: createordersDto.deletedAt,

      status: createordersDto.status,

      message: createordersDto.message,

      phone: createordersDto.phone,

      email: createordersDto.email,

      fullName: createordersDto.fullName,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.ordersRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: orders['id']) {
    return this.ordersRepository.findById(id);
  }

  findByIds(ids: orders['id'][]) {
    return this.ordersRepository.findByIds(ids);
  }

  async update(
    id: orders['id'],

    updateordersDto: UpdateordersDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.ordersRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      deletedAt: updateordersDto.deletedAt,

      status: updateordersDto.status,

      message: updateordersDto.message,

      phone: updateordersDto.phone,

      email: updateordersDto.email,

      fullName: updateordersDto.fullName,
    });
  }

  remove(id: orders['id']) {
    return this.ordersRepository.remove(id);
  }
}
