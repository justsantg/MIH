import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateproductsDto } from './dto/create-products.dto';
import { UpdateproductsDto } from './dto/update-products.dto';
import { productsRepository } from './infrastructure/persistence/products.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { products } from './domain/products';
import { categoriesRepository } from 'src/categories/infrastructure/persistence/categories.repository';

@Injectable()
export class productsService {
  constructor(
    private readonly productsRepository: productsRepository,
    private readonly categoriesRepository: categoriesRepository,
  ) { }

  async create(createproductsDto: CreateproductsDto) {
    // Buscar categoría por ID
    const category = await this.categoriesRepository.findById(
      createproductsDto.categoryId,
    );

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Crear producto con categoryId + relación
    return this.productsRepository.create({
      name: createproductsDto.name,
      description: createproductsDto.description,
      unitPrice: createproductsDto.unitPrice,
      wholesalePrice: createproductsDto.wholesalePrice,
      stock: createproductsDto.stock,
      imageUrl: createproductsDto.imageUrl,
      categoryId: createproductsDto.categoryId,
      category: {
        id: category.id,
        name: category.name,
        description: category.description,
      },
    });
  }

  async update(id: products['id'], updateproductsDto: UpdateproductsDto) {
    // Si viene categoryId en el update
    if (updateproductsDto.categoryId) {
      const category = await this.categoriesRepository.findById(
        updateproductsDto.categoryId,
      );

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      return this.productsRepository.update(id, {
        name: updateproductsDto.name,
        description: updateproductsDto.description,
        unitPrice: updateproductsDto.unitPrice,
        wholesalePrice: updateproductsDto.wholesalePrice,
        stock: updateproductsDto.stock,
        imageUrl: updateproductsDto.imageUrl,
        categoryId: updateproductsDto.categoryId,
        category: {
          id: category.id,
          name: category.name,
          description: category.description,
        },
      });
    }

    // Si no viene categoryId → actualiza sin tocar la categoría
    return this.productsRepository.update(id, {
      name: updateproductsDto.name,
      description: updateproductsDto.description,
      unitPrice: updateproductsDto.unitPrice,
      wholesalePrice: updateproductsDto.wholesalePrice,
      stock: updateproductsDto.stock,
      imageUrl: updateproductsDto.imageUrl,
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

  remove(id: products['id']) {
    return this.productsRepository.remove(id);
  }
}
