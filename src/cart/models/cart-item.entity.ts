import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from "./cart.entity";

@Entity({
  name: 'cart_items'
})
export class CartItemEntity {
  @Column({
    type: 'uuid',
    nullable: false,
  })
  product_id: string;

  @Column({
    type: 'integer',
    nullable: false,
    default: 0,
  })
  count: number;

  @ManyToOne(() => CartEntity)
  @JoinColumn({
    name: 'cart_id',
    referencedColumnName: 'id',
  })
  cart_id: CartEntity['id'];
}
