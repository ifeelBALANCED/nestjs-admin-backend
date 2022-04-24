import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFollows1650715034267 implements MigrationInterface {
    name = 'CreateFollows1650715034267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "articles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "articles"."updatedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "articles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "articles"."createdAt" IS NULL`);
    }

}
