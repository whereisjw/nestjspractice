import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nickname: string;
  @Column()
  email: string;
  @Column()
  password: string;
/*   @Column({
    type: 'enum',
    default: Role.USER,
  })
  role: Role; */
}

 

 
