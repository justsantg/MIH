import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { productsService } from './products.service';
import { productsController } from './products.controller';
import { RelationalproductsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalproductsPersistenceModule,
  ],
  controllers: [productsController],
  providers: [productsService],
  exports: [productsService, RelationalproductsPersistenceModule],
})
export class productsModule {}
