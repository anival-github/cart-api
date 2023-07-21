
import { Injectable } from '@nestjs/common';
import { CartEntity } from '../models/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItemEntity } from '../models/cart-item.entity';
import { CartItem } from '../models';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,
  ) {}

  findAll(): Promise<CartEntity[]> {
    return this.cartRepository.find();
  }

  findOne(id: string): Promise<CartEntity | null> {
    return this.cartRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.cartRepository.delete(id);
  }

  findByUserId(userId: string): Promise<CartEntity> {
    return this.cartRepository.findOne({ where: { user_id: userId }});
  }

  async createByUserId(userId: string) {
    const date = new Date();

    const cart = this.cartRepository.create({
      user_id: userId,
      created_at: date,
      updated_at: date,
    });

    await this.cartRepository.save(cart);

    return cart;
  }

  async findOrCreateByUserId(userId: string): Promise<CartEntity> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, items: CartItem[]): Promise<CartEntity> {
    const cart = await this.findOrCreateByUserId(userId);

    const itemsToSave: CartItemEntity[] = items.map(cartItem => ({
      product_id: cartItem.product.id,
      count: cartItem.count,
      cart_id: cart.id,
    }))

    const createdItems = this.cartItemRepository.create(itemsToSave);

    await this.cartItemRepository.save(createdItems);
    const updatedCart = await this.findByUserId(userId);

    return updatedCart
  }

  async removeByUserId(userId): Promise<void> {
    await this.cartRepository.delete({ user_id: userId });
  }
}
