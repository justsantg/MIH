import {
  // decorators here

  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateproductsDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string | null;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  stock: number;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  wholesalePrice?: number | null;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  id: number;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
