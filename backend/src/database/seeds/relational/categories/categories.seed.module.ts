import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { categoriesEntity } from '../../../../categories/infrastructure/persistence/relational/entities/categories.entity';
import { CategoriesSeedService } from './categories.seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([categoriesEntity])],
  providers: [CategoriesSeedService],
  exports: [CategoriesSeedService],
})
export class CategoriesSeedModule {}
