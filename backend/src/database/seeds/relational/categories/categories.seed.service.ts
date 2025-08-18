import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { categoriesEntity } from '../../../../categories/infrastructure/persistence/relational/entities/categories.entity';

@Injectable()
export class CategoriesSeedService {
  constructor(
    @InjectRepository(categoriesEntity)
    private readonly repository: Repository<categoriesEntity>,
  ) {}

  async run() {
  const categories = [
    { name: 'Camisetas', description: 'Ropa personalizada' },
    { name: 'Tazas', description: 'Tazas con diseño' },
    { name: 'Buzos', description: 'Abrigos personalizados' },
  ];

  for (const cat of categories) {
    const exists = await this.repository.findOne({ where: { name: cat.name } });
    if (!exists) {
      await this.repository.save(this.repository.create(cat));
    }
  }
}

}