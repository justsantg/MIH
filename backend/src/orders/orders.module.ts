import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { ordersService } from './orders.service';
import { ordersController } from './orders.controller';
import { RelationalordersPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalordersPersistenceModule,
  ],
  controllers: [ordersController],
  providers: [ordersService],
  exports: [ordersService, RelationalordersPersistenceModule],
})
export class ordersModule {}
