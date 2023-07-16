import { CartStatus } from "src/shared";
import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Carts1689181187203 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'carts',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                isGenerated: true,
            },
              {
                name: 'user_id',
                type: 'uuid',
                isNullable: false,
              },
              {
                name: 'created_at',
                type: 'date',
                isNullable: false,
              },
              {
                name: 'updated_at',
                type: 'date',
                isNullable: false,
              },
              {
                name: 'status',
                type: 'text',
                enum: Object.keys(CartStatus),
                default: "'OPEN'",
              },
            ],
          }),
          true
        );

        const date = new Date();

        // await queryRunner.query(`
        //   INSERT INTO carts(user_id, created_at, updated_at)
        //   VALUES (${1}, ${date}, ${date});
        // `)
      }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('carts');
    }

}
