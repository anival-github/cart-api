import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from "./cart.entity";
import { ProductEntity } from "src/products/models/product.entity";

@Entity({ name: 'cart_items'})
export class CartItemEntity {
  @OneToOne(() => ProductEntity, product => product.id)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product_id: ProductEntity['id']

  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product: ProductEntity;

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
