import { CartStatus } from "src/shared";
import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Carts1689181187203 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'products',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              isNullable: false,
          },
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'description',
              type: 'text',
            },
            {
              name: 'price',
              type: 'integer',
            },
          ],
        }),
        true
      );

      await queryRunner.createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              isGenerated: true,
            },
            {
              name: 'name',
              type: 'text',
            },
            {
              name: 'email',
              type: 'text',
            },
            {
              name: 'password',
              type: 'text',
            },
          ],
        }),
        true,
      );
  
      await queryRunner.query(`
          INSERT INTO users(id, name ,email , password)
          VALUES ('20e3ac50-cbee-4983-9d60-556bb6d08eff', 'Valentin', 'val@mail.com', '123');
      `);
  
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

        await queryRunner.query(`
          INSERT INTO carts(id, user_id, created_at, updated_at)
          VALUES ('20e3ac50-cbee-4983-9d60-556bb6d08ef1', '20e3ac50-cbee-4983-9d60-556bb6d08eff', '2011-10-05T14:48:00.000Z', '2011-10-05T14:48:00.000Z')
        `)

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
              {
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                columnNames: ['user_id'],
                onDelete: 'CASCADE',
              },
            ],
          }),
          true
        );

        // await queryRunner.query(`
        //   INSERT INTO orders(user_id, cart_id, payment, delivery, comments, status, total)
        //   VALUES (${1}, ${1}, 'cash', 'address', 'some comment', 'new', ${1});
        // `)

        await queryRunner.createTable(
          new Table({
            name: 'cart_items',
            columns: [
              {
                name: 'product_id',
                type: 'uuid',
                isPrimary: true,
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
              {
                referencedTableName: 'products',
                referencedColumnNames: ['id'],
                columnNames: ['product_id'],
                onDelete: 'CASCADE',
              },
            ],
          }),
          true
        );

        // await queryRunner.query(`
        //   INSERT INTO orders(product_id, count, cart_id)
        //   VALUES (${1}, ${1}, ${1});
        // `)


      }


    public async down(queryRunner: QueryRunner): Promise<void> {
      await Promise.all([
        queryRunner.dropTable('carts'),
        queryRunner.dropTable('users'),
        queryRunner.dropTable('orders'),
        queryRunner.dropTable('cart_items'),
      ])
    }

}
