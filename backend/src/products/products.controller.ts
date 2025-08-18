import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { productsService } from './products.service';
import { CreateproductsDto } from './dto/create-products.dto';
import { UpdateproductsDto } from './dto/update-products.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { products } from './domain/products';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllproductsDto } from './dto/find-all-products.dto';

@ApiTags('Products')
/* @ApiBearerAuth()
@UseGuards(AuthGuard('jwt')) */
@Controller({
  path: 'products',
  version: '1',
})
export class productsController {
  constructor(private readonly productsService: productsService) {}

  @Post()
  @ApiCreatedResponse({
    type: products,
  })
  create(@Body() createproductsDto: CreateproductsDto) {
    return this.productsService.create(createproductsDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(products),
  })
  async findAll(
    @Query() query: FindAllproductsDto,
  ): Promise<InfinityPaginationResponseDto<products>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.productsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: products,
  })
  findById(@Param('id') id: string) {
    return this.productsService.findById(Number(id));
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: products,
  })
  update(
    @Param('id') id: string,
    @Body() updateproductsDto: UpdateproductsDto,
  ) {
    return this.productsService.update(Number(id), updateproductsDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(Number(id));
  }
}
