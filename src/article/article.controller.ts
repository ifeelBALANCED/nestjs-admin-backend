import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponseInterface } from './types/articleResponse.interface';
import {
  ArticlesResponseInterface,
  CommentsRO,
} from './types/articlesResponse.interface';
import { AuthGuard } from '../user/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { ArticlesResponseOutput } from './output/articlesResponse.output';
import { BackendValidationPipe } from '../shared/pipes/backendValidation.pipe';
import { CreateCommentDto } from './dto/createComment.dto';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @ApiImplicitQuery({
    name: 'tag',
    required: false,
    type: String,
  })
  @ApiImplicitQuery({
    name: 'author',
    required: false,
    type: String,
  })
  @ApiImplicitQuery({
    name: 'favorited',
    required: false,
    type: Boolean,
  })
  @ApiImplicitQuery({
    name: 'limit',
    required: false,
    type: String,
  })
  @ApiImplicitQuery({
    name: 'offset',
    required: false,
    type: String,
  })
  @ApiOkResponse({ type: ArticlesResponseOutput })
  async findAll(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.findAll(currentUserId, query);
  }

  // @Get('feed')
  // @ApiOkResponse({ type: ArticlesResponseOutput })
  // @ApiImplicitQuery({
  //   name: 'limit',
  //   required: false,
  //   type: String,
  // })
  // @ApiImplicitQuery({
  //   name: 'offset',
  //   required: false,
  //   type: String,
  // })
  // @UseGuards(AuthGuard)
  // async getFeed(
  //   @User('id') currentUserId: number,
  //   @Query() query: any,
  // ): Promise<ArticlesResponseInterface> {
  //   return await this.articleService.getFeed(currentUserId, query);
  // }

  @ApiOperation({ summary: 'Get article feed' })
  @ApiResponse({ status: 200, description: 'Return article feed.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('feed')
  async getFeed(
    @User('id') userId: number,
    @Query() query,
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.getFeed(userId, query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: ArticlesResponseOutput })
  @ApiBody({ type: CreateArticleDto })
  @UsePipes(new BackendValidationPipe())
  async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.createArticle(
      currentUser,
      createArticleDto,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Get(':slug')
  @ApiOkResponse({ type: ArticlesResponseOutput })
  async getSingleArticle(
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.findBySlug(slug);
    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.deleteArticle(slug, currentUserId);
  }

  @Get(':slug/comments')
  async findComments(@Param('slug') slug): Promise<CommentsRO> {
    return await this.articleService.findComments(slug);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  @ApiBody({ type: CreateArticleDto })
  @ApiOkResponse({ type: ArticlesResponseOutput })
  async updateArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body('article') updateArticleDto: CreateArticleDto,
  ) {
    const article = await this.articleService.updateArticle(
      slug,
      updateArticleDto,
      currentUserId,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post(':slug/comments')
  async createComment(
    @Param('slug') slug,
    @Body('comment') commentData: CreateCommentDto,
  ) {
    return await this.articleService.addComment(slug, commentData);
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({
    status: 201,
    description: 'The article has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':slug/comments/:id')
  async deleteComment(@Param() params) {
    const { slug, id } = params;
    return await this.articleService.deleteComment(slug, id);
  }

  @Post(':slug/favorite')
  @ApiOkResponse({ type: ArticlesResponseOutput })
  @UseGuards(AuthGuard)
  async addArticleToFavorites(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.addArticleToFavorites(
      slug,
      currentUserId,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug/favorite')
  @ApiOkResponse({ type: ArticlesResponseOutput })
  @UseGuards(AuthGuard)
  async deleteArticleFromFavorites(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.deleteArticleFromFavorites(
      slug,
      currentUserId,
    );
    return this.articleService.buildArticleResponse(article);
  }
}
