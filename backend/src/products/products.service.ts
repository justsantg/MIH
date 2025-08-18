import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateproductsDto } from './dto/create-products.dto';
import { UpdateproductsDto } from './dto/update-products.dto';
import { productsRepository } from './infrastructure/persistence/products.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { products } from './domain/products';

@Injectable()
export class productsService {
  constructor(
    // Dependencies here
    private readonly productsRepository: productsRepository,
  ) {}

  async create(createproductsDto: CreateproductsDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.productsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      imageUrl: createproductsDto.imageUrl,

      stock: createproductsDto.stock,

      wholesalePrice: createproductsDto.wholesalePrice,

      unitPrice: createproductsDto.unitPrice,

      description: createproductsDto.description,

      name: createproductsDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.productsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: products['id']) {
    return this.productsRepository.findById(id);
  }

  findByIds(ids: products['id'][]) {
    return this.productsRepository.findByIds(ids);
  }

  async update(
    id: products['id'],

    updateproductsDto: UpdateproductsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.productsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      imageUrl: updateproductsDto.imageUrl,

      stock: updateproductsDto.stock,

      wholesalePrice: updateproductsDto.wholesalePrice,

      unitPrice: updateproductsDto.unitPrice,

      description: updateproductsDto.description,

      name: updateproductsDto.name,

      id: updateproductsDto.id,
    });
  }

  remove(id: products['id']) {
    return this.productsRepository.remove(id);
  }
}
