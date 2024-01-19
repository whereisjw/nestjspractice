import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entitiy';
import { InjectRepository } from '@nestjs/typeorm';

export interface PostModel {
  id: number;
  writer: string;
  title: string;
  content: string;
  image?: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    writer: '작성자',
    title: '글제목',
    content: '글내용',
    commentCount: 2,
    likeCount: 9,
  },
  {
    id: 2,
    writer: 'newjeans_fan',
    title: '뉴진스 민지',
    content: '뉴진스 민지의 무대 의상',
    commentCount: 21,
    likeCount: 92,
  },
  {
    id: 3,
    writer: 'newjeans_fan',
    title: '뉴진스 해린',
    content: '춤 연습하는 뉴진스 해린',
    commentCount: 4,
    likeCount: 5,
  },
];

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async getPosts() {
    return this.postsRepository.find({
      relations: ['writer'],
    });
  }

  async getPost(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
      relations: ['writer'],
    });

    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async postPosts(writerId: number, title: string, content: string) {
    // create > 저장할 객체를 생성한다.
    // save -> 객체를저장한다 (create메서드에서 생성한 객체로)

    const post = this.postsRepository.create({
      writer: {
        id: writerId,
      },
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);

    return post;
  }

  async putPost(id: number, title: string, content: string) {
    // save의 기능
    // 만약에 데이터가 존재하지 않는다면 새로 생성한다
    //  데이터가 존재한다면 존재하는 값을 업데이트한다
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }
    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async deletePost(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });
    if (!post) {
      throw new NotFoundException();
    }

    await this.postsRepository.delete(id);
  } //deletePost
}
