import { ApiProperty } from '@nestjs/swagger';
import { DeleteDateColumn } from 'typeorm';

export class products {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  imageUrl?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  stock: number;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  wholesalePrice?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  unitPrice: number;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
