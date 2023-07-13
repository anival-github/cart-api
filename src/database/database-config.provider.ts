import { Injectable } from '@nestjs/common';
import { ConfigProvider } from '../config/config.provider';
import { DbConfig } from './database.config';

@Injectable()
export class DbConfigProvider {
  constructor(private readonly config: ConfigProvider) {}

  getDbConfig(): DbConfig {
    return {
      host: this.config.get<string>('DB_ENDPOINT_ADDRESS'),
      port: this.config.get<number>('PGDB_PORT'),
      username: this.config.get<string>('PGDB_USER'),
      database: this.config.get<string>('DB_NAME'),
      region: this.config.get<string>('PGDB_REGION'),
    };
  }
}
