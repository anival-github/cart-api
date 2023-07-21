import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from "./cart.entity";
import { ProductEntity } from "src/products/models/product.entity";

@Entity({ name: 'cart_items'})
export class CartItemEntity {
  @PrimaryColumn()
  @Column({
    primary: true,
    type: 'uuid'
  })
  product_id: ProductEntity['id']

  @Column({
    type: 'integer',
    nullable: false,
    default: 0,
  })
  count: number;

  @ManyToOne(() => CartEntity, cartEntity => cartEntity.id)
  @JoinColumn({
    name: 'cart_id',
    referencedColumnName: 'id',
  })
  cart_id: CartEntity['id'];
}
