import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class categoriesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
