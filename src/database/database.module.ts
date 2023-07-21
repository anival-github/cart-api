import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseLogger from './database-logger';
import getDataSourceOptions from './get-data-source-options';
import { ConfigModule } from '../config';
import { DbConfigProvider } from './database-config.provider';

@Module({
  imports: [ConfigModule],
  providers: [DbConfigProvider],
  exports: [DbConfigProvider],
})
class DatabaseConfigModule {}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DbConfigProvider],
      useFactory: (dbConfigProvider: DbConfigProvider) => ({
        ...getDataSourceOptions(dbConfigProvider),
        autoLoadEntities: true,
        logging: 'all',
        synchronize: true,
        logger: new DatabaseLogger(),
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
