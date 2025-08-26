import { products } from '../../../../domain/products';
import { ProductsEntity } from '../entities/products.entity';

export class productsMapper {
  static toDomain(raw: ProductsEntity): products {
    const domainEntity = new products();

    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    domainEntity.unitPrice = raw.unitPrice;
    domainEntity.wholesalePrice = raw.wholesalePrice;
    domainEntity.stock = raw.stock;
    domainEntity.imageUrl = raw.imageUrl;
    domainEntity.categoryId = raw.categoryId; // 👈 nuevo campo
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    // 👇 si viene con la relación cargada, la mapeamos también
    if (raw.category) {
      domainEntity.category = {
        id: raw.category.id,
        name: raw.category.name,
        description: raw.category.description,
      };
    }

    return domainEntity;
  }

  static toPersistence(domainEntity: products): ProductsEntity {
    const persistenceEntity = new ProductsEntity();

    persistenceEntity.id = domainEntity.id;
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.unitPrice = domainEntity.unitPrice;
    persistenceEntity.wholesalePrice = domainEntity.wholesalePrice;
    persistenceEntity.stock = domainEntity.stock;
    persistenceEntity.imageUrl = domainEntity.imageUrl;
    persistenceEntity.categoryId = domainEntity.categoryId; // 👈 nuevo campo
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
