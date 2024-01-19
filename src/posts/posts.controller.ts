import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

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
    return this.postsService.getPosts();
  }
  // 2) get /posts/:id
  // id에 해당되는 post를 가져온다
  // 예를 들어서 id =1 일 경우 id가 1인 포스트를 가져온다.
  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPost(+id);
  }

  // 3 post /posts
  // post생성한다

  @Post()
  postPosts(@Body('writerId') writerId: number, @Body('title') title: string, @Body('content') content: string) {
    return this.postsService.postPosts(writerId, title, content);
  }

  // 4 put /posts/:id
  // id에 해당하는 포스트를 변경

  @Put(':id')
  putPost(
    @Param('id') id: string,

    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.putPost(+id, title, content);
  }

  // 5 delete /posts/:id
  // id에 해당하는 포스트를 삭제

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(+id);
  }
}
