import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

interface Post {
  writer: string;
  title: string;
  content: string;
  image?: string;
  likeCount: number;
  commentCount: number;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPost(): Post {
    return {
      writer: 'newjeans_fan',
      title: '뉴진스 민지',
      content: '메이크업 고치고 있는 민지2',
      likeCount: 1000,
      commentCount: 10,
    };
  }
}
/* 
writer:string
title:string
content:string
image:string
likeCount:number
commentCount:number
*/
