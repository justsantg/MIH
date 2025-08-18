import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { categoriesService } from './categories.service';
import { categoriesController } from './categories.controller';
import { RelationalcategoriesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalcategoriesPersistenceModule,
  ],
  controllers: [categoriesController],
  providers: [categoriesService],
  exports: [categoriesService, RelationalcategoriesPersistenceModule],
})
export class categoriesModule {}
