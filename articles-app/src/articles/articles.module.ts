import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  //   exports: [ArticlesService], // Export service if needed by other modules - added for referrence purposes
})
export class ArticlesModule {}
