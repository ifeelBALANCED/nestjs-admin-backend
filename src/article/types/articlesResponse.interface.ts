import { ArticleType } from './article.type';
import { CommentEntity } from '../comment.entity';

export interface ArticlesResponseInterface {
  articles: ArticleType[];
  articlesCount: number;
}

export interface CommentsRO {
  comments: CommentEntity[];
}
