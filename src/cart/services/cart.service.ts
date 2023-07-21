import { Injectable } from '@nestjs/common';
import { CartEntity } from '../models/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Cart, CartItem } from '../models';
import { ProductService } from 'src/products/services/product.service';
import { CartItemEntity } from '../models/cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,
    private productService: ProductService,
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
    return this.cartRepository.findOne({ where: { user_id: userId }, relations: { items: true }});
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


  async getCartItems(userId: string): Promise<CartItem[]> {
    console.log('userId: ', userId);
    let userCart = null;

    userCart = await this.findByUserId(userId);

    if (!userCart) {
      userCart = await this.createByUserId(userId);
    }
    console.log('userCart: ', userCart);

    const productIds = userCart.items.map(item => item.product_id);

    const products = await this.productService.find({ where: { id: In(productIds) }}) || [];

    console.log('products: ', products);

    const items = userCart.items.map(cartItem => ({ count: cartItem.count, product: products.find(item => item.id === cartItem.product_id) }))
    console.log('items: ', items);
    return items;
  }

  async updateByUserId(userId: string, item: CartItem): Promise<CartEntity> {
    const cart = await this.findOrCreateByUserId(userId);
    await this.productService.upsertProduct(item.product);

    const cartItemToSave: CartItemEntity = {
      product_id: item.product.id,
      count: item.count,
      cart_id: cart.id,
    }

    const createdCartItem = this.cartItemRepository.create(cartItemToSave);

    await this.cartItemRepository.save(createdCartItem);
    const updatedCart = await this.findByUserId(userId);

    return updatedCart
  }

  async removeByUserId(userId): Promise<void> {
    await this.cartRepository.delete({ user_id: userId });
  }
}
