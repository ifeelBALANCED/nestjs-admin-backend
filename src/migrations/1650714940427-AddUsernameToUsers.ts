import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUsernameToUsers1650714940427 implements MigrationInterface {
    name = 'AddUsernameToUsers1650714940427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "articles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "articles"."updatedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "articles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "articles"."createdAt" IS NULL`);
    }

}
