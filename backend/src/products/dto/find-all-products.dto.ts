import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from './products.dto';

export class FindAllProductsDto {
  @ApiProperty({ type: [ProductResponseDto] })
  data: ProductResponseDto[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
