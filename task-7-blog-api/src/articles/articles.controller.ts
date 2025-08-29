import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new article' })
  @ApiBody({ type: CreateArticleDto })
  @ApiResponse({
    status: 201,
    description: 'Article has been successfully created',
    type: Article,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all articles' })
  @ApiResponse({
    status: 200,
    description: 'List of all articles',
    type: [Article],
  })
  async findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific article by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Article ID' })
  @ApiResponse({
    status: 200,
    description: 'Article found',
    type: Article,
  })
  @ApiResponse({ status: 404, description: 'Article not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return this.articlesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing article completely' })
  @ApiParam({ name: 'id', type: 'number', description: 'Article ID' })
  @ApiBody({ type: UpdateArticleDto })
  @ApiResponse({
    status: 200,
    description: 'Article has been successfully updated',
    type: Article,
  })
  @ApiResponse({ status: 404, description: 'Article not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an article by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Article ID' })
  @ApiResponse({
    status: 200,
    description: 'Article has been successfully deleted',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        id: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Article not found' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; id: number }> {
    return this.articlesService.remove(id);
  }

  @Get('stats/overview')
  @ApiOperation({ summary: 'Get articles statistics' })
  @ApiResponse({
    status: 200,
    description: 'Articles statistics',
    schema: {
      type: 'object',
      properties: {
        total: { type: 'number' },
        latest: { $ref: '#/components/schemas/Article' },
      },
    },
  })
  async getStats(): Promise<{ total: number; latest: Article | null }> {
    return this.articlesService.getStats();
  }
}
