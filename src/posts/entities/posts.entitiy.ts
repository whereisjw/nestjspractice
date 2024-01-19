import { UserModel } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostsModel {
  @PrimaryGeneratedColumn()
  id: number;

  //user테이블과 연동하기 ,null이 될수없다
  @ManyToOne(() => UserModel, (user) => user.posts, {
    nullable: false,
  })
  writer: UserModel;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
