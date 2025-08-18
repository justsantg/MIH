// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateproductsDto } from './create-products.dto';

export class UpdateproductsDto extends PartialType(CreateproductsDto) {}
