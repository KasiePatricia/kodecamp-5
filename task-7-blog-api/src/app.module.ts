import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { ArticlesModule } from './articles/articles.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ArticlesModule],
  controllers: [AppController, ArticlesController],
  providers: [AppService, ArticlesService, PrismaService],
})
export class AppModule {}
