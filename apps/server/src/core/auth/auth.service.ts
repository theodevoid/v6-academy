import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';

import { UserService } from '~/core/user/user.service';
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

    if (!user.password) throw new UnauthorizedException();

    const passwordIsValid = await compare(passwordInput, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }

  public async login(user: Pick<User, 'email' | 'id'>) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async register(user: Prisma.UserCreateInput) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...newUser } = await this.userService.createUser(user);

    return newUser;
  }

  public async registerWithEmailAndPassword(email: string, password: string) {
    const userWithEmailIsRegistered = await this.userService.getUser({
      email,
    });

    if (userWithEmailIsRegistered) {
      throw new UnprocessableEntityException(
        'email has already been registered',
      );
    }

    const hashedPassword = await hash(password, config.bcryptSaltRounds);

    return await this.register({ email, password: hashedPassword });
  }

  public async signInWithGithub(
    githubId: string,
    email?: string,
  ): Promise<Omit<User, 'password'>> {
    const userByGithubId = await this.userService.getUser({
      githubId,
    });

    if (userByGithubId) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = userByGithubId;
      return user;
    }

    const userRegisterPayload: Prisma.UserCreateInput = {
      githubId,
    };

    if (email) {
      const userByEmail = await this.userService.getUser({
        email,
      });

      if (!userByEmail) {
        userRegisterPayload.email = email;
      }
    }

    return await this.register(userRegisterPayload);
  }
}
