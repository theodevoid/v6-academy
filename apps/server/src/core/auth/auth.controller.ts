import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

import { User } from '~/core/user/user.decorator';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@User() user: Omit<UserModel, 'password'>) {
    return await this.authService.login(user);
  }

  @Post('/register')
  async register(@Body() userRegisterDTO: RegisterUserDTO) {
    const user = await this.authService.register(userRegisterDTO);

    return user;
  }
}
