import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
