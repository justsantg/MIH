import { orders } from '../../../../domain/orders';

import { ordersEntity } from '../entities/orders.entity';

export class ordersMapper {
  static toDomain(raw: ordersEntity): orders {
    const domainEntity = new orders();
    domainEntity.deletedAt = raw.deletedAt;

    domainEntity.status = raw.status;

    domainEntity.message = raw.message;

    domainEntity.phone = raw.phone;

    domainEntity.email = raw.email;

    domainEntity.fullName = raw.fullName;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: orders): ordersEntity {
    const persistenceEntity = new ordersEntity();
    persistenceEntity.deletedAt = domainEntity.deletedAt;

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.message = domainEntity.message;

    persistenceEntity.phone = domainEntity.phone;

    persistenceEntity.email = domainEntity.email;

    persistenceEntity.fullName = domainEntity.fullName;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
