import { Module } from '@nestjs/common';
import { productsRepository } from '../products.repository';
import { productsRelationalRepository } from './repositories/products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity])],
  providers: [
    {
      provide: productsRepository,
      useClass: productsRelationalRepository,
    },
  ],
  exports: [productsRepository],
})
export class RelationalproductsPersistenceModule {}
