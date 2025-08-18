import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from '../../../../products/infrastructure/persistence/relational/entities/products.entity';
import { categoriesEntity } from '../../../../categories/infrastructure/persistence/relational/entities/categories.entity';
import { ProductsSeedService } from './products.seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity, categoriesEntity])], // 👈 aquí ambas
  providers: [ProductsSeedService],
  exports: [ProductsSeedService],
})
export class ProductsSeedModule {}
