import { ApiProperty } from '@nestjs/swagger';

export class Article {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the article',
  })
  id: number;

  @ApiProperty({
    example: 'Getting Started with NestJS',
    description: 'The title of the article',
  })
  title: string;

  @ApiProperty({
    example: 'This is a comprehensive guide to NestJS...',
    description: 'The content of the article',
  })
  content: string;

  @ApiProperty({
    example: '2024-08-29T10:30:45.123Z',
    description: 'When the article was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-08-29T10:30:45.123Z',
    description: 'When the article was last updated',
  })
  updatedAt: Date;
}
