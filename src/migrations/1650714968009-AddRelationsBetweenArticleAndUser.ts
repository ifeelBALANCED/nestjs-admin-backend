import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationsBetweenArticleAndUser1650714968009 implements MigrationInterface {
    name = 'AddRelationsBetweenArticleAndUser1650714968009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "articles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "articles"."updatedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "articles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "articles"."createdAt" IS NULL`);
    }

}
