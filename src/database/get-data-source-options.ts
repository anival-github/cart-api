import { DataSourceOptions } from 'typeorm';
import { DbConfigProvider } from './database-config.provider';
import { CartEntity } from 'src/cart/models/cart.entity';
import { CartItemEntity } from 'src/cart/models/cart-item.entity';
import { OrderEntity } from 'src/order/models/order.entity';
import { Carts1689181187203 } from './migrations/1689181187203-all';

export default function getDataSourceOptions(
  dbConfigProvider: DbConfigProvider,
): DataSourceOptions {
  const { host, port, username, database, password } = dbConfigProvider.getDbConfig();
  console.log('PASSWORD: ', password);

  return {
    type: 'postgres',
    host,
    port,
    username,
    database,
    entities: [CartEntity, CartItemEntity, OrderEntity],
    password,
    ssl: true,
    migrations: [Carts1689181187203],
    migrationsRun: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      },
    }
  };
}
