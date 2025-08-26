import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { productsService } from './products.service';
import { productsController } from './products.controller';
import { RelationalproductsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { CategoriesModule } from '../categories/categories.module'; // 👈 importa el módulo de categorías

@Module({
  imports: [
    // do not remove this comment
    RelationalproductsPersistenceModule,
    CategoriesModule, // 👈 necesario para resolver categoriesRepository
  ],
  controllers: [productsController],
  providers: [productsService],
  exports: [productsService, RelationalproductsPersistenceModule],
})
export class productsModule {}
