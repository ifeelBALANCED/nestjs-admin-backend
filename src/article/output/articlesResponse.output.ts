import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/user.entity';

export class ArticlesResponseOutput {
  @ApiProperty()
  articles: {
    id: number;
    slug: string;
    title: string;
    description: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    tagList: string[];
    favoritesCount: number;
    author: UserEntity;
  }[];
  @ApiProperty()
  articlesCount: number;
}
