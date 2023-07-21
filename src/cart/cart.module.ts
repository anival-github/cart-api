import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './models/cart.entity';
import { CartItemEntity } from './models/cart-item.entity';


@Module({
  imports: [ OrderModule, TypeOrmModule.forFeature([CartEntity, CartItemEntity]) ],
  providers: [ CartService ],
  controllers: [ CartController ],
  exports: [TypeOrmModule]
})
export class CartModule {}
