import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ProductsEntity } from 'src/products/infrastructure/persistence/relational/entities/products.entity';

@Entity({
  name: 'categories',
})
export class categoriesEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    type: String,
  })
  name: string;

  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @OneToMany(() => ProductsEntity, (product) => product.category)
  products: ProductsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    nullable: true,
    type: Date,
  })
  deletedAt?: Date | null;
}
