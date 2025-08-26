import { NestFactory } from '@nestjs/core';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';
import { ProductsSeedService } from './products/products.seed.service';
import { CategoriesSeedService } from './categories/categories.seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // Orden correcto de ejecución
  await app.get(RoleSeedService).run();
  await app.get(StatusSeedService).run();
  await app.get(UserSeedService).run();

  await app.get(CategoriesSeedService).run(); // 👈 primero categorías
  await app.get(ProductsSeedService).run();   // 👈 luego productos
  
  await app.close();
};

void runSeed();
