import { ApiProperty } from '@nestjs/swagger';

export class orders {
  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  deletedAt?: Date | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  status?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  message?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  phone?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  email: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  fullName: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
