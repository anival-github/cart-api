import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './models/order.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([OrderEntity]) ],
  providers: [ OrderService ],
  exports: [ OrderService, TypeOrmModule ]
})

export class OrderModule {}
