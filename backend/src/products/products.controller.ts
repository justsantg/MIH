import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { productsService } from './products.service';
import { CreateproductsDto } from './dto/create-products.dto';
import { UpdateproductsDto } from './dto/update-products.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { AuthGuard } from '@nestjs/passport';
import { ProductResponseDto } from './dto/products.dto';
import { PaginationQueryDto } from '../utils/dto/pagination-query.dto';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'products',
  version: '1',
})
export class productsController {
  constructor(private readonly productsService: productsService) {}

  @Post()
  @ApiCreatedResponse({
    type: ProductResponseDto, // ✅ Respuesta de creación
  })
  async create(@Body() createproductsDto: CreateproductsDto) {
    return this.productsService.create(createproductsDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ProductResponseDto), // ✅ Listado con paginación
  })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<InfinityPaginationResponseDto<ProductResponseDto>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.productsService.findAllWithPagination({
        paginationOptions: { page, limit },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @ApiOkResponse({
    type: ProductResponseDto,
  })
  async findById(@Param('id') id: string) {
    return this.productsService.findById(Number(id));
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @ApiOkResponse({
    type: ProductResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateproductsDto: UpdateproductsDto,
  ) {
    return this.productsService.update(Number(id), updateproductsDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @ApiOkResponse({ type: ProductResponseDto })
  async remove(@Param('id') id: string) {
    return this.productsService.remove(Number(id));
  }
}
