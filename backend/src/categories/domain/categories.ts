import { ApiProperty } from '@nestjs/swagger';

/**
 * Modelo resumido de producto cuando se devuelve embebido dentro de una categoría.
 * (Evita dependencias circulares con el domain `products`).
 */
export class CategoryProduct {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, nullable: true })
  description?: string | null;

  @ApiProperty({ type: Number })
  unitPrice: number;

  @ApiProperty({ type: Number, nullable: true })
  wholesalePrice?: number | null;

  @ApiProperty({ type: Number })
  stock: number;

  @ApiProperty({ type: String, nullable: true })
  imageUrl?: string | null;

  @ApiProperty({ type: String })
  categoryId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class categories {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, nullable: true })
  description?: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt?: Date | null;

  // Relación OneToMany -> productos (opcional; se popula solo si cargas la relación)
  @ApiProperty({ type: () => [CategoryProduct], required: false })
  products?: CategoryProduct[];
}
