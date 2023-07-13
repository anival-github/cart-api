import { Signer } from '@aws-sdk/rds-signer';
import { DataSourceOptions } from 'typeorm';
import { DbConfigProvider } from './database-config.provider';
import { CartEntity } from 'src/cart/models/cart.entity';
import { CartItemEntity } from 'src/cart/models/cart-item.entity';
import { Order } from 'src/order/models/order.entity';
import { Orders1689181237819 } from './migrations/1689181237819-orders';
import { CartItems1689181221066 } from './migrations/1689181221066-cartItems';
import { Carts1689181187203 } from './migrations/1689181187203-carts';

function getCloudPassword(dbConfigProvider: DbConfigProvider) {
  const { region, host, port, username } = dbConfigProvider.getDbConfig();

  return async () => {
    const signer = new Signer({
      region,
      hostname: host,
      port,
      username,
    });

    return signer.getAuthToken();
  };
}

export default function getDataSourceOptions(
  dbConfigProvider: DbConfigProvider,
): DataSourceOptions {
  const password = getCloudPassword(dbConfigProvider);

  const { host, port, username, database } = dbConfigProvider.getDbConfig();

  return {
    type: 'postgres',
    host,
    port,
    username,
    database,
    entities: [CartEntity, CartItemEntity, Order],
    password,
    ssl: true,
    migrations: [Orders1689181237819, CartItems1689181221066, Carts1689181187203],
    migrationsRun: true,
  };
}
