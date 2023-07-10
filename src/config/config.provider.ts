import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigProvider {
  constructor(private readonly config: ConfigService) {}

  public get<T>(key: string): T {
    const value = this.config.get<T>(key);

    if (value) return value;

    throw new Error(`Configuration variable ${key} was not found`);
  }
}
