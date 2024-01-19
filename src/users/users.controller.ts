import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  createUser(@Body('nickname') nickname: string, @Body('email') email: string, @Body('password') password: string) {
    return this.usersService.createUser(nickname, email, password);
  }
}
