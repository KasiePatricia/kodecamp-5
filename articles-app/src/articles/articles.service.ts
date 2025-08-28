import { Injectable } from '@nestjs/common';
import { Article } from './interfaces/article.interface';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  private readonly articles: Article[] = [];
  private idCounter = 1;

  create(createArticleDto: CreateArticleDto): Article {
    const now = new Date();
    const article: Article = {
      id: this.idCounter++,
      title: createArticleDto.title,
      content: createArticleDto.content,
      author: createArticleDto.author,
      createdAt: now,
      updatedAt: now,
    };

    this.articles.push(article);
    return article;
  }

  findAll(): Article[] {
    return this.articles;
  }

  findOne(id: number): Article | undefined {
    return this.articles.find((article) => article.id === id);
  }

  getCount(): number {
    return this.articles.length;
  }
}
