import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ArticleEntity } from '../article/article.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  username: string;

  @Column({ default: '' })
  @ApiProperty()
  bio: string;

  @Column({ default: '' })
  @ApiProperty()
  image: string;

  @Column({ select: false })
  @ApiProperty()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];

  @ManyToMany(() => ArticleEntity)
  @JoinTable()
  favorites: ArticleEntity[];
}
