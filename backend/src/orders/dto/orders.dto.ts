import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ordersDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
