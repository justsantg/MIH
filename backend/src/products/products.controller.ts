import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
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
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { ProductResponseDto } from './dto/products.dto';
import { PaginationQueryDto } from '../utils/dto/pagination-query.dto';
import { Public } from '../auth/decorators/public.decorator'; // 👈 Importa el decorador
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Products')
@ApiBearerAuth()
@Controller({
  path: 'products',
  version: '1',
})
export class productsController {
  constructor(private readonly productsService: productsService) { }

  @Post()
  @ApiCreatedResponse({ type: ProductResponseDto })
  async create(@Body() createproductsDto: CreateproductsDto) {
    return this.productsService.create(createproductsDto);
  }

  @Public()
  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ProductResponseDto),
  })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<InfinityPaginationResponseDto<ProductResponseDto>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) limit = 50;

    return infinityPagination(
      await this.productsService.findAllWithPagination({
        paginationOptions: { page, limit },
      }),
      { page, limit },
    );
  }

  @Public()
  @Get(':id')
  @ApiParam({ name: 'id', type: Number, required: true })
  @ApiOkResponse({ type: ProductResponseDto })
  async findById(@Param('id') id: string) {
    return this.productsService.findById(Number(id));
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number, required: true })
  @ApiOkResponse({ type: ProductResponseDto })
  async update(
    @Param('id') id: string,
    @Body() updateproductsDto: UpdateproductsDto,
  ) {
    return this.productsService.update(Number(id), updateproductsDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, required: true })
  @ApiOkResponse({ type: ProductResponseDto })
  async remove(@Param('id') id: string) {
    return this.productsService.remove(Number(id));
  }

  // 📌 Nuevo endpoint para subir imágenes;
@Post('upload-image')
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  },
})
@UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/products',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Solo se permiten imágenes'), false);
      }
      callback(null, true);
    },
  }),
)
async uploadFile(@UploadedFile() file: Express.Multer.File) {
  if (!file) {
    throw new Error('No se subió ningún archivo');
  }
  return {
    filename: file.filename,
    url: `/uploads/products/${file.filename}`,
  };
}

}
