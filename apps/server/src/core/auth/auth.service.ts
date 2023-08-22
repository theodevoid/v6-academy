import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '~/core/user/user.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { config } from '~/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async validateUserCredentials(email: string, passwordInput: string) {
    const user = await this.userService.getUser({ email });

    if (!user) throw new NotFoundException('user not found');

    const passwordIsValid = await compare(passwordInput, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }

  public async login(user: Omit<User, 'password'>) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async register(user: Prisma.UserCreateInput) {
    const userWithEmailIsRegistered = await this.userService.getUser({
      email: user.email,
    });

    if (userWithEmailIsRegistered) {
      throw new UnprocessableEntityException(
        'email has already been registered',
      );
    }

    const hashedPassword = await hash(user.password, config.bcryptSaltRounds);

    const newUser = await this.userService.createUser({
      email: user.email,
      password: hashedPassword,
    });

    return newUser;
  }
}
