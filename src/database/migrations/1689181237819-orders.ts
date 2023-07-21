import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Orders1689181237819 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'orders',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
              },
              {
                name: 'user_id',
                type: 'uuid',
                isNullable: false,
              },
              {
                name: 'cart_id',
                type: 'uuid',
              },
              {
                name: 'payment',
                type: 'json',
              },
              {
                name: 'delivery',
                type: 'json',
              },
              {
                name: 'comments',
                type: 'text',
              },
              {
                name: 'status',
                type: 'text',
              },
              {
                name: 'total',
                type: 'int',
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
          INSERT INTO orders(user_id, cart_id, payment, delivery, comments, status, total)
          VALUES (${1}, ${1}, 'cash', 'address', 'some comment', 'new', ${1});
        `)
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders');
    }

}
  