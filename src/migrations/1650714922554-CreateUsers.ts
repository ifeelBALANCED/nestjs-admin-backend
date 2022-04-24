import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsers1650714922554 implements MigrationInterface {
    name = 'CreateUsers1650714922554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "articles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "articles"."updatedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "articles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "articles"."createdAt" IS NULL`);
    }

}
