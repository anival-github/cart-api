import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'products'
})
export class ProductEntity {
  @Column({ name: 'id',  type: 'uuid' })
  id: string;

  @Column({ name: 'title',  type: 'text' })
  title: string;

  @Column({ name: 'description',  type: 'text' })
  description: string;

  @Column({ name: 'price',  type: 'int' })
  price: number;
}
