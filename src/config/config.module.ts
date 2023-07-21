import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigProvider } from './config.provider';

@Module({
  imports: [NestConfigModule.forRoot()],
  providers: [ConfigProvider],
  exports: [ConfigProvider],
})
export class ConfigModule {}
