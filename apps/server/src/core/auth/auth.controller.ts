import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { User } from '~/core/user/user.decorator';
import { User as UserModel } from '@prisma/client';
import { RegisterUserDTO } from './dto/register-user.dto';

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
