import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from "src/cart/models/cart.entity";

@Entity({
  name: 'orders'
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  user_id: string;

  @ManyToOne(() => CartEntity, cart => cart.id)
  @JoinColumn({
    name: 'cart_id',
    referencedColumnName: 'id',
  })
  cart: CartEntity;

  @Column({
    type: 'json',
  })
  payment: string;

  @Column({
    type: 'json',
  })
  delivery: string;

  @Column({
    type: 'string',
  })
  comments: string;

  @Column({
    type: 'string',
  })
  status: string;

  @Column({
    type: 'int',
  })
  total: number;
}
