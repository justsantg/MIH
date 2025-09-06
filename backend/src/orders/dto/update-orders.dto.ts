// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateordersDto } from './create-orders.dto';

export class UpdateordersDto extends PartialType(CreateordersDto) {}
