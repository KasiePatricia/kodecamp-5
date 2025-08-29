import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({
    example: 'Getting Started with NestJS',
    description: 'The title of the article',
    minLength: 1,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(1, { message: 'Title cannot be empty' })
  @MaxLength(200, { message: 'Title cannot exceed 200 characters' })
  title!: string;

  @ApiProperty({
    example:
      'This is a comprehensive guide to getting started with NestJS framework...',
    description: 'The content of the article',
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty({ message: 'Content is required' })
  @MinLength(1, { message: 'Content cannot be empty' })
  content!: string;
}
