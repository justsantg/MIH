import { categories } from '../../../../domain/categories';
import { categoriesEntity } from '../entities/categories.entity';
import { ProductsEntity } from 'src/products/infrastructure/persistence/relational/entities/products.entity';
import { CategoryProduct } from '../../../../domain/categories';

export class categoriesMapper {
  static toDomain(raw: categoriesEntity): categories {
    const domainEntity = new categories();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;

    // 👇 Si viene con productos relacionados, los mapeamos
    if (raw.products) {
      domainEntity.products = raw.products.map((product: ProductsEntity) => {
        const p = new CategoryProduct();
        p.id = product.id;
        p.name = product.name;
        p.description = product.description;
        p.unitPrice = product.unitPrice;
        p.wholesalePrice = product.wholesalePrice;
        p.stock = product.stock;
        p.imageUrl = product.imageUrl;
        p.categoryId = product.categoryId;
        p.createdAt = product.createdAt;
        p.updatedAt = product.updatedAt;
        return p;
      });
    }

    return domainEntity;
  }

  static toPersistence(domainEntity: categories): categoriesEntity {
    const persistenceEntity = new categoriesEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;

    // 👇 Normalmente en persistencia no cargamos los productos,
    // porque se manejan en su propio repository
    return persistenceEntity;
  }
}
