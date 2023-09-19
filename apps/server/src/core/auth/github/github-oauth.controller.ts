import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request, Response } from 'express';

import { AuthService } from '../auth.service';
import { GithubOauthGuard } from './github-oauth.guard';

@Controller('auth/github')
export class GithubOauthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(GithubOauthGuard)
  async githubAuth() {
    // With `@UseGuards(GithubOauthGuard)` we are using an AuthGuard that @nestjs/passport
    // automatically provisioned for us when we extended the passport-github strategy.
    // The Guard initiates the passport-github flow.
  }

  @Get('callback')
  @UseGuards(GithubOauthGuard)
  async githubAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Passport automatically creates a `user` object, based on the return value of our
    // GithubOauthStrategy#validate() method, and assigns it to the Request object as `req.user`

    const user = req.user as User;

    const { access_token } = await this.authService.login(user);
    res.cookie('jwt', access_token);

    return { access_token: access_token };
  }
}
