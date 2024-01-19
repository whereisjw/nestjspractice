import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { PostModel } from 'src/posts/posts.service';
import { PostsModel } from 'src/posts/entities/posts.entitiy';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 20,
    unique: true,
  })
  // 길이가 20을 넘지않을것 ,유일무이한 값이될것
  nickname: string;
  @Column({
    unique: true,
  })
  //유일무이한 값이될것
  email: string;
  @Column()
  password: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => PostsModel, (post) => post.writer)
  posts: PostModel[];
}
