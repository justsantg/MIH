import {
  // decorators here

  IsString,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateordersDto {
  deletedAt?: Date | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  status?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  message?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  phone?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  email: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  fullName: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
