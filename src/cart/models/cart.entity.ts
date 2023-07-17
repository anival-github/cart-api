import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartItemEntity } from "./cart-item.entity";
import { CartStatus } from "src/shared/models";
import { UserEntity } from "src/users/models/user.entity";

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

  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
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
  @JoinColumn()
  items: CartItemEntity[];  
}
