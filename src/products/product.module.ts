import { Module } from '@nestjs/common';
import { ProductService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './models/product.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ProductEntity]) ],
  providers: [ ProductService ],
  exports: [ ProductService, TypeOrmModule ]
})

export class ProductModule {}
