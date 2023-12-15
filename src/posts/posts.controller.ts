import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
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

// 1) get /posts
// 모든 posts를 다 가져온다

// 2) get /posts/:id
// id에 해당되는 post를 가져온다
// 예를 들어서 id =1 일 경우 id가 1인 포스트를 가져온다.

// 3 post /posts
// post생성한다

// 4 put /posts/:id
// id에 해당하는 포스트를 변경

// 5 delete /posts/:id
// id에 해당하는 포스트를 삭제

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) get /posts
  // 모든 posts를 다 가져온다
  @Get()
  getPosts() {
    return posts;
  }
  // 2) get /posts/:id
  // id에 해당되는 post를 가져온다
  // 예를 들어서 id =1 일 경우 id가 1인 포스트를 가져온다.
  @Get(':id')
  getPost(@Param('id') id: string) {
    const post = posts.find((post) => post.id === Number(id));

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  // 3 post /posts
  // post생성한다

  @Post()
  postPosts(
    @Body('writer') writer: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const post = {
      id: posts[posts.length - 1].id + 1,
      writer,
      title,
      content,
      commentCount: 0,
      likeCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  // 4 put /posts/:id
  // id에 해당하는 포스트를 변경

  @Put(':id')
  putPost(
    @Param('id') id: string,
    @Body('writer') writer: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }
    if (writer) {
      post.writer = writer;
    }
    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    posts = posts.map((prev) => (prev.id === +id ? post : prev));
  }

  // 5 delete /posts/:id
  // id에 해당하는 포스트를 삭제
}
