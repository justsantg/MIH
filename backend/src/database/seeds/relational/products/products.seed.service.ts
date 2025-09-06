import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsEntity } from '../../../../products/infrastructure/persistence/relational/entities/products.entity';
import { categoriesEntity } from '../../../../categories/infrastructure/persistence/relational/entities/categories.entity';

@Injectable()
export class ProductsSeedService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly repo: Repository<ProductsEntity>,

    @InjectRepository(categoriesEntity)
    private readonly categoriesRepo: Repository<categoriesEntity>,
  ) {}

  async run() {
    const count = await this.repo.count();
    if (count > 0) return;

    // Buscamos las categorías existentes
    const camisetas = await this.categoriesRepo.findOne({ where: { name: 'Camisetas' } });
    const tazas = await this.categoriesRepo.findOne({ where: { name: 'Tazas' } });
    const buzos = await this.categoriesRepo.findOne({ where: { name: 'Buzos' } });

    if (!camisetas || !tazas || !buzos) {
      throw new Error('Faltan categorías, ejecuta primero CategoriesSeedService');
    }

    await this.repo.save([
      this.repo.create({
        name: 'Camiseta personalizada',
        description: 'Camiseta 100% algodón con estampado a medida.',
        unitPrice: 25.99,
        wholesalePrice: 20.0,
        stock: 100,
        imageUrl: 'https://via.placeholder.com/200x200.png?text=Camiseta',
        categoryId: camisetas.id,
      }),
      this.repo.create({
        name: 'Taza con logo',
        description: 'Taza cerámica personalizada con tu logo.',
        unitPrice: 10.5,
        wholesalePrice: 8.0,
        stock: 200,
        imageUrl: 'https://via.placeholder.com/200x200.png?text=Taza',
        categoryId: tazas.id,
      }),
      this.repo.create({
        name: 'Buzo bordado',
        description: 'Buzo personalizado con bordado exclusivo.',
        unitPrice: 35.0,
        wholesalePrice: 28.0,
        stock: 150,
        imageUrl: 'https://via.placeholder.com/200x200.png?text=Buzo',
        categoryId: buzos.id,
      }),
    ]);
  }
}
