import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class productsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
