import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1649706015539 implements MigrationInterface {
  name = 'SeedDb1649706015539';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );

    // password is 123123
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('guest', 'guest@gmail.com', '$2b$10$2gKRDPH3kVtprgPZ3yS9tuCi5L2X12BqNz4DCkJd7COt8p5goSt0K')`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'first article description', 'first article body', 'coffee, dragons', 1)`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'Second article', 'second article description', 'second article body', 'coffee, dragons', 1)`,
    );
  }

  public async down(): Promise<void> {}
}
