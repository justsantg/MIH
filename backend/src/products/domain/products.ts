import { ApiProperty } from '@nestjs/swagger';
import { DeleteDateColumn } from 'typeorm';

export class products {
  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  id: number;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  unitPrice: number;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  wholesalePrice?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  stock: number;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  imageUrl?: string | null;


  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  categoryId: string;


  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  category?: {
    id: string;
    name: string;
    description?: string | null;
  } | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
