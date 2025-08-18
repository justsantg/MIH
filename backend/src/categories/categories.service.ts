import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreatecategoriesDto } from './dto/create-categories.dto';
import { UpdatecategoriesDto } from './dto/update-categories.dto';
import { categoriesRepository } from './infrastructure/persistence/categories.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { categories } from './domain/categories';

@Injectable()
export class categoriesService {
  constructor(
    // Dependencies here
    private readonly categoriesRepository: categoriesRepository,
  ) {}

  async create(createcategoriesDto: CreatecategoriesDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.categoriesRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      deletedAt: createcategoriesDto.deletedAt,

      description: createcategoriesDto.description,

      name: createcategoriesDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.categoriesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: categories['id']) {
    return this.categoriesRepository.findById(id);
  }

  findByIds(ids: categories['id'][]) {
    return this.categoriesRepository.findByIds(ids);
  }

  async update(
    id: categories['id'],

    updatecategoriesDto: UpdatecategoriesDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.categoriesRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      deletedAt: updatecategoriesDto.deletedAt,

      description: updatecategoriesDto.description,

      name: updatecategoriesDto.name,
    });
  }

  remove(id: categories['id']) {
    return this.categoriesRepository.remove(id);
  }
}
