import { Injectable } from '@nestjs/common';
import { CreatecategoriesDto } from './dto/create-categories.dto';
import { UpdatecategoriesDto } from './dto/update-categories.dto';
import { categoriesRepository } from './infrastructure/persistence/categories.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { categories } from './domain/categories';

@Injectable()
export class categoriesService {
  constructor(
    private readonly categoriesRepository: categoriesRepository,
  ) {}

  async create(createcategoriesDto: CreatecategoriesDto) {
    return this.categoriesRepository.create({
      deletedAt: createcategoriesDto.deletedAt,
      description: createcategoriesDto.description,
      name: createcategoriesDto.name,
      // 👇 No pasamos products aquí, porque se manejan en su propio repositorio
    });
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    // 👇 Esto ya devuelve categorías con sus productos gracias al repositorio
    return this.categoriesRepository.findAllWithPagination({
      paginationOptions,
    });
  }

  async findById(id: categories['id']) {
    // 👇 Ya incluye products porque lo resolvemos en el repository
    return this.categoriesRepository.findById(id);
  }

  async findByIds(ids: categories['id'][]) {
    return this.categoriesRepository.findByIds(ids);
  }

  async update(
    id: categories['id'],
    updatecategoriesDto: UpdatecategoriesDto,
  ) {
    return this.categoriesRepository.update(id, {
      deletedAt: updatecategoriesDto.deletedAt,
      description: updatecategoriesDto.description,
      name: updatecategoriesDto.name,
    });
  }

  async remove(id: categories['id']) {
    return this.categoriesRepository.remove(id);
  }
}
