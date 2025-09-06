import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { categoriesEntity } from 'src/categories/infrastructure/persistence/relational/entities/categories.entity';

@Entity({ name: 'products' })
export class ProductsEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description?: string | null;

  @Column({ nullable: false, type: 'decimal' })
  unitPrice: number;

  @Column({ nullable: true, type: 'decimal' })
  wholesalePrice?: number | null;

  @Column({ nullable: false, type: 'int' })
  stock: number;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  imageUrl?: string | null;

  @ManyToOne(() => categoriesEntity, (category) => category.products, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  category: categoriesEntity;

  @Column({ nullable: false })
  categoryId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;
}
