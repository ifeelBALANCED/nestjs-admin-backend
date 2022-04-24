import {
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CommentEntity } from './comment.entity';

@Entity({ name: 'articles' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  slug: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column({ default: '' })
  @ApiProperty()
  description: string;

  @Column({ default: '' })
  @ApiProperty()
  body: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updatedAt: Date;

  @Column('simple-array')
  @ApiProperty()
  tagList: string[];

  @Column({ default: 0 })
  @ApiProperty()
  favoritesCount: number;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
  author: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.article, {
    eager: true,
  })
  @JoinColumn()
  comments: CommentEntity[];
}
