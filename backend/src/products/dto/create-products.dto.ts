import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsNumber, IsOptional } from 'class-validator';

export class CreateproductsDto {
  @ApiProperty({ required: true, type: () => String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false, type: () => String })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({ required: true, type: () => Number })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ required: false, type: () => Number })
  @IsOptional()
  @IsNumber()
  wholesalePrice?: number | null;

  @ApiProperty({ required: true, type: () => Number })
  @IsNumber()
  stock: number;

  @ApiProperty({ required: false, type: () => String })
  @IsOptional()
  @IsString()
  imageUrl?: string | null;

  @ApiProperty({ type: String, description: 'Id of the category' }) 
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}
