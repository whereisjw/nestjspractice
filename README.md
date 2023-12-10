# nest js 프로젝트 시작하기

- nest new 프로젝트파일명
- nest g resource
- path명 (crud 어쩌구저쩌구나오면 n)

```
import {
  Body,
  Controller,
  Delete,
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

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }
    posts = posts.filter((post) => post.id !== +id);

    return id;
  }
}
```

# Dependency Injection , Inversion of Control

```
class A {
const b = B()
}

class B{}

A라는 클래스를 인스턴스를 만들때마다 A안에다가 클래스 B를 새로 생성한다.
```

class A{
constructor(instance:B)
}

class B{

}

# SQL기본기

- 데이터는 왜 초기화되는가?

  - hdd/ssd(영구적으로 저장) -> RAM(실행하는 데이터만 램에 올라감 프로그램이 재시작되면 리셋,하지만 속도가 빠름)
  - 그래서 프로그램이 종료되더라도 데이터를 유지하려면 HDD/SDD에 데이터를 작성해야함.
  - 가장 흔히 사용되는 방법이 SQL이다.

  # Docker 이론

- nestjs 프로젝트를 하다보면 여러개의 컴퓨터에서 구동을 할 수 있어야함(팀협업, 배포 등)
- 멀티플랫폼(윈도우,맥,리눅스) 설치 절차가 대로 하면 프로그램이 시작하면 되는 것이 dockerfile
- 도커가 나온 이후 배포와 CI/CD 가 매우 쉬워짐
- 같은 조건에서 같은 환경으로 항상 프로그램이 시작되도록 해당 컨테이너를 실행할 수 있도록 도와주는 도구
- 가상화(Virtual Machine) vs 도커(Docker)
  - 가상화 할경우 hypervisor가 올라감
