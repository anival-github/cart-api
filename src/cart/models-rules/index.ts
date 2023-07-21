import { CartItemEntity } from '../models/cart-item.entity';
import { CartEntity } from '../models/cart.entity';

const DEFAULT_PRICE = 100;

export function calculateCartTotal(cart: CartEntity): number {
  return cart ? cart.items.reduce((acc: number, { count }: CartItemEntity) => {
    return acc += DEFAULT_PRICE * count;
  }, 0) : 0;
}
