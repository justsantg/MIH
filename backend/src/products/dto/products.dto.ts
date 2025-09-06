import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string | null;

  @ApiProperty()
  unitPrice: number;

  @ApiProperty({ required: false })
  wholesalePrice?: number | null;

  @ApiProperty()
  stock: number;

  @ApiProperty({ required: false })
  imageUrl?: string | null;

  @ApiProperty()
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
}
