import { Controller, Get, UseGuards } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { User } from './user.decorator';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  public async getUsers() {
    return await this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test')
  testUsers(@User() user: UserModel) {
    return user;
  }
}
