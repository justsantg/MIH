import { Module } from '@nestjs/common';
import { ordersRepository } from '../orders.repository';
import { ordersRelationalRepository } from './repositories/orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ordersEntity } from './entities/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ordersEntity])],
  providers: [
    {
      provide: ordersRepository,
      useClass: ordersRelationalRepository,
    },
  ],
  exports: [ordersRepository],
})
export class RelationalordersPersistenceModule {}
