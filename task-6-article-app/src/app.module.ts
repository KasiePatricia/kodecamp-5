import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesService } from './articles/articles.service';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [ArticlesModule],
  controllers: [AppController],
  providers: [AppService, ArticlesService],
})
export class AppModule {}
