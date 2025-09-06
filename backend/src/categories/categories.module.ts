import { Module } from '@nestjs/common';
import { categoriesRepository } from './infrastructure/persistence/categories.repository';
import { RelationalcategoriesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { categoriesController } from './categories.controller';
import { categoriesService } from './categories.service';


@Module({
  imports: [
    RelationalcategoriesPersistenceModule,
  ],
  controllers: [categoriesController],
  providers: [categoriesService],
  exports: [categoriesService, RelationalcategoriesPersistenceModule],
})
export class CategoriesModule {}
