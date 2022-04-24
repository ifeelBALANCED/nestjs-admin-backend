import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ArticleEntity } from '../../article/article.entity';

@Expose()
export class ProfileResponseOutput {
  @ApiProperty()
  @Exclude()
  profile: {
    id: number;
    email: string;
    username: string;
    bio: string;
    image: string;
    password: string;
    articles: ArticleEntity[];
    favorites: ArticleEntity[];
    following: boolean;
  };
}
