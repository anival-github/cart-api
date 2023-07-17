import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'products'
})
export class ProductEntity {
  @PrimaryColumn()
  @Column({ name: 'id',  type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'title',  type: 'text' })
  title: string;

  @Column({ name: 'description',  type: 'text' })
  description: string;

  @Column({ name: 'price',  type: 'int' })
  price: number;
}
