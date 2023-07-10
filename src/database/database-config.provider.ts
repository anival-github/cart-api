import { Injectable } from '@nestjs/common';
import { ConfigProvider } from '../config/config.provider';
import { DbConfig } from './database.config';

@Injectable()
export class DbConfigProvider {
  constructor(private readonly config: ConfigProvider) {}

  getMigrationsPattern(): string {
    return this.config.get<string>('DB_MIGRATIONS_PATTERN');
  }

  getDbConfig(): DbConfig {
    return {
      host: this.config.get<string>('PGDB_HOST'),
      port: this.config.get<number>('PGDB_PORT'),
      username: this.config.get<string>('PGDB_USER'),
      database: this.config.get<string>('PGDB_DB'),
      region: this.config.get<string>('PGDB_REGION'),
    };
  }
}
