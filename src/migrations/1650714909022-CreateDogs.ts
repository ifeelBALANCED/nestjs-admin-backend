import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDogs1650714909022 implements MigrationInterface {
    name = 'CreateDogs1650714909022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment_entity" ("id" SERIAL NOT NULL, "body" character varying NOT NULL, "articleId" integer, CONSTRAINT "PK_5a439a16c76d63e046765cdb84f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "body" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "tagList" text NOT NULL, "favoritesCount" integer NOT NULL DEFAULT '0', "authorId" integer, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dog" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "age" integer NOT NULL, "breed" character varying(100), CONSTRAINT "PK_187826f37fd8e592a5711350db1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "follows" ("id" SERIAL NOT NULL, "followerId" integer NOT NULL, "followingId" integer NOT NULL, CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_favorites_articles" ("usersId" integer NOT NULL, "articlesId" integer NOT NULL, CONSTRAINT "PK_aebb5070a5fa58957adae6d78af" PRIMARY KEY ("usersId", "articlesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b3bc5ca3e98f5f3858dbf626ad" ON "users_favorites_articles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_61dc60abcf0035e5ce2aea013b" ON "users_favorites_articles" ("articlesId") `);
        await queryRunner.query(`ALTER TABLE "comment_entity" ADD CONSTRAINT "FK_095b0e27d7a343c41d85a18def8" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_favorites_articles" ADD CONSTRAINT "FK_b3bc5ca3e98f5f3858dbf626ad6" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_favorites_articles" ADD CONSTRAINT "FK_61dc60abcf0035e5ce2aea013bc" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_favorites_articles" DROP CONSTRAINT "FK_61dc60abcf0035e5ce2aea013bc"`);
        await queryRunner.query(`ALTER TABLE "users_favorites_articles" DROP CONSTRAINT "FK_b3bc5ca3e98f5f3858dbf626ad6"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34"`);
        await queryRunner.query(`ALTER TABLE "comment_entity" DROP CONSTRAINT "FK_095b0e27d7a343c41d85a18def8"`);
        await queryRunner.query(`DROP INDEX "IDX_61dc60abcf0035e5ce2aea013b"`);
        await queryRunner.query(`DROP INDEX "IDX_b3bc5ca3e98f5f3858dbf626ad"`);
        await queryRunner.query(`DROP TABLE "users_favorites_articles"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "follows"`);
        await queryRunner.query(`DROP TABLE "dog"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "comment_entity"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
