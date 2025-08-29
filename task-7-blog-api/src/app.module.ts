import { Module } from '@nestjs/common';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { ArticlesModule } from './articles/articles.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ArticlesModule, PrismaModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, PrismaService],
})
export class AppModule {}
