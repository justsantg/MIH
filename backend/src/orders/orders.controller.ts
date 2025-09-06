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
import { ordersService } from './orders.service';
import { CreateordersDto } from './dto/create-orders.dto';
import { UpdateordersDto } from './dto/update-orders.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { orders } from './domain/orders';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllordersDto } from './dto/find-all-orders.dto';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Orders')
@ApiBearerAuth() // 🔒 Swagger sabrá que requiere token
@Controller({
  path: 'orders',
  version: '1',
})
export class ordersController {
  constructor(private readonly ordersService: ordersService) {}

  // 👉 Público: cualquier usuario puede crear orden
  @Public()
  @Post()
  @ApiCreatedResponse({
    type: orders,
  })
  create(@Body() createordersDto: CreateordersDto) {
    return this.ordersService.create(createordersDto);
  }

  // 🔒 Solo admin (requiere token)
  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(orders),
  })
  async findAll(
    @Query() query: FindAllordersDto,
  ): Promise<InfinityPaginationResponseDto<orders>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) limit = 50;

    return infinityPagination(
      await this.ordersService.findAllWithPagination({
        paginationOptions: { page, limit },
      }),
      { page, limit },
    );
  }

  // 🔒 Solo admin
  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOkResponse({ type: orders })
  findById(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  // 🔒 Solo admin
  @Patch(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOkResponse({ type: orders })
  update(@Param('id') id: string, @Body() updateordersDto: UpdateordersDto) {
    return this.ordersService.update(id, updateordersDto);
  }

  // 🔒 Solo admin
  @Delete(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
