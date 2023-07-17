import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'users'
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    name: 'name',
    nullable: true,
  })
  name: string;

  @Column({
    type: 'text',
    name: 'email',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'text',
    name: 'password',
    nullable: false,
  })
  password: string;
}
