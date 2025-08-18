import { categories } from '../../../../domain/categories';

import { categoriesEntity } from '../entities/categories.entity';

export class categoriesMapper {
  static toDomain(raw: categoriesEntity): categories {
    const domainEntity = new categories();
    domainEntity.deletedAt = raw.deletedAt;

    domainEntity.description = raw.description;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: categories): categoriesEntity {
    const persistenceEntity = new categoriesEntity();
    persistenceEntity.deletedAt = domainEntity.deletedAt;

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
