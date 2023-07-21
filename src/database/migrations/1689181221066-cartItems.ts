import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CartItems1689181221066 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'cart_items',
            columns: [
              {
                name: 'product_id',
                type: 'uuid',
                isNullable: false,
            },
              {
                name: 'count',
                type: 'integer',
                isNullable: false,
                default: 0,
              },
              {
                name: 'cart_id',
                type: 'uuid',
              },
            ],
            foreignKeys: [
              {
                referencedTableName: 'carts',
                referencedColumnNames: ['id'],
                columnNames: ['cart_id'],
                onDelete: 'CASCADE',
              },
            ],
          }),
          true
        );

        await queryRunner.query(`
          INSERT INTO orders(product_id, count, cart_id)
          VALUES (${1}, ${1}, ${1});
        `)

      }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cart_items');
    }

}
