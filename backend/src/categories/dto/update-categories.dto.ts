// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatecategoriesDto } from './create-categories.dto';

export class UpdatecategoriesDto extends PartialType(CreatecategoriesDto) {}
