import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartItemEntity } from "./cart-item.entity";
import { CartStatus } from "src/shared/models";

@Entity({
  name: 'carts'
})
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  user_id: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  created_at: Date;

  @Column({
    type: 'date',
    nullable: false,
  })
  updated_at: Date;

  @Column({
    type: 'text',
    enum: CartStatus,
    default: CartStatus.OPEN,
  })
  status: string;

  @OneToMany(() => CartItemEntity, cartItem => cartItem.cart_id, { cascade: true })
  items: CartItemEntity[];  
}
