import { Module } from '@nestjs/common';
import { categoriesRepository } from '../categories.repository';
import { categoriesRelationalRepository } from './repositories/categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { categoriesEntity } from './entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([categoriesEntity])],
  providers: [
    {
      provide: categoriesRepository, // 👈 usamos el abstracto como token
      useClass: categoriesRelationalRepository, // 👈 implementación concreta
    },
  ],
  exports: [categoriesRepository], // 👈 exportamos el token abstracto, no la clase concreta
})
export class RelationalcategoriesPersistenceModule {}
