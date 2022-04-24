import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsModule } from './dogs/dogs.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import ormConfig from './ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { TagModule } from './tag/tag.module';
import { ArticleModule } from './article/article.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    DogsModule,
    TagModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ArticleModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
