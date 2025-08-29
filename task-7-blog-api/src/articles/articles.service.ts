// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { CreateArticleDto } from './dto/create-article.dto';
// import { UpdateArticleDto } from './dto/update-article.dto';
// import { Article } from './entities/article.entity';

// @Injectable()
// export class ArticlesService {
//   constructor(private prisma: PrismaService) {}

//   async create(createArticleDto: CreateArticleDto): Promise<Article> {
//     return this.prisma.article.create({
//       data: createArticleDto,
//     });
//   }

//   async findAll(): Promise<Article[]> {
//     return this.prisma.article.findMany({
//       orderBy: { createdAt: 'desc' },
//     });
//   }

//   async findOne(id: number): Promise<Article> {
//     const article = await this.prisma.article.findUnique({
//       where: { id },
//     });

//     if (!article) {
//       throw new NotFoundException(`Article with ID ${id} not found`);
//     }

//     return article;
//   }

//   async update(
//     id: number,
//     updateArticleDto: UpdateArticleDto,
//   ): Promise<Article> {
//     try {
//       return await this.prisma.article.update({
//         where: { id },
//         data: updateArticleDto,
//       });
//     } catch (error) {
//       throw new NotFoundException(`Article with ID ${id} not found`);
//     }
//   }

//   async remove(id: number): Promise<{ message: string; id: number }> {
//     try {
//       await this.prisma.article.delete({
//         where: { id },
//       });
//       return {
//         message: `Article with ID ${id} has been successfully deleted`,
//         id,
//       };
//     } catch (error) {
//       throw new NotFoundException(`Article with ID ${id} not found`);
//     }
//   }

//   async getStats(): Promise<{ total: number; latest: Article | null }> {
//     const [total, latest] = await Promise.all([
//       this.prisma.article.count(),
//       this.prisma.article.findFirst({
//         orderBy: { createdAt: 'desc' },
//       }),
//     ]);

//     return { total, latest };
//   }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = await this.prisma.article.create({
      data: createArticleDto,
    });
    return article;
  }

  async findAll(): Promise<Article[]> {
    const articles = await this.prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return articles;
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return article;
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    try {
      const updatedArticle = await this.prisma.article.update({
        where: { id },
        data: updateArticleDto,
      });
      return updatedArticle;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Article with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<{ message: string; id: number }> {
    try {
      await this.prisma.article.delete({
        where: { id },
      });
      return {
        message: `Article with ID ${id} has been successfully deleted`,
        id,
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Article with ID ${id} not found`);
      }
      throw error;
    }
  }

  async getStats(): Promise<{ total: number; latest: Article | null }> {
    const [total, latest] = await Promise.all([
      this.prisma.article.count(),
      this.prisma.article.findFirst({
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { total, latest };
  }
}
