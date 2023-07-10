import { Signer } from '@aws-sdk/rds-signer';
import { DataSourceOptions } from 'typeorm';
import { DbConfigProvider } from './database-config.provider';
import { CartEntity } from 'src/cart/models/cart.entity';
import { CartItemEntity } from 'src/cart/models/cart-item.entity';
import { Order } from 'src/order/models/order.entity';

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
  };
}
