import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { categoriesService } from './categories.service';
import { CreatecategoriesDto } from './dto/create-categories.dto';
import { UpdatecategoriesDto } from './dto/update-categories.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { categories } from './domain/categories';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllcategoriesDto } from './dto/find-all-categories.dto';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'categories',
  version: '1',
})
export class categoriesController {
  constructor(private readonly categoriesService: categoriesService) {}

  @Post()
  @ApiCreatedResponse({
    type: categories,
  })
  async create(@Body() createcategoriesDto: CreatecategoriesDto) {
    return this.categoriesService.create(createcategoriesDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(categories),
  })
  async findAll(
    @Query() query: FindAllcategoriesDto,
  ): Promise<InfinityPaginationResponseDto<categories>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.categoriesService.findAllWithPagination({
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
    type: categories,
  })
  async findById(@Param('id') id: string) {
    return this.categoriesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: categories,
  })
  async update(
    @Param('id') id: string,
    @Body() updatecategoriesDto: UpdatecategoriesDto,
  ) {
    return this.categoriesService.update(id, updatecategoriesDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  async remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
