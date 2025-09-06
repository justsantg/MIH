import { PartialType } from '@nestjs/swagger';
import { CreateproductsDto } from './create-products.dto';

export class UpdateproductsDto extends PartialType(CreateproductsDto) {}
