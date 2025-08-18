import { products } from '../../../../domain/products';

import { ProductsEntity } from '../entities/products.entity';

export class productsMapper {
  static toDomain(raw: ProductsEntity): products {
    const domainEntity = new products();
    domainEntity.imageUrl = raw.imageUrl;

    domainEntity.stock = raw.stock;

    domainEntity.wholesalePrice = raw.wholesalePrice;

    domainEntity.unitPrice = raw.unitPrice;

    domainEntity.description = raw.description;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;

    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: products): ProductsEntity {
    const persistenceEntity = new ProductsEntity();
    persistenceEntity.imageUrl = domainEntity.imageUrl;

    persistenceEntity.stock = domainEntity.stock;

    persistenceEntity.wholesalePrice = domainEntity.wholesalePrice;

    persistenceEntity.unitPrice = domainEntity.unitPrice;

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.name = domainEntity.name;

    persistenceEntity.id = domainEntity.id;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
