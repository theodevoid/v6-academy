import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';

import { UserService } from '~/core/user/user.service';
import { config } from '~/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super({
      clientID: config.githubOauthClient,
      clientSecret: config.githubOauthSecret,
      callbackURL: 'http://localhost:2000/auth/github/callback',
      scope: ['public_profile', 'user'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    // For each strategy, Passport will call the verify function (implemented with this
    // `validate()` method in @nestjs/passport) using an appropriate strategy-specific set of
    // parameters. For the passport-github strategy Passport expects a `validate()` method with
    // the following signature:
    //   `validate(accessToken: string, refreshToken: string, profile: Profile): any`
    // As you can see from this, `validate()` receives the access token and optional refresh
    // token, as well as profile which contains the authenticated user's GitHub profile.
    // We can pass these information to find or create the user in our system.
    // The Passport library expects this method to return a full user if the validation
    // succeeds, or a null if it fails. When returning a user, Passport will complete its tasks
    // (e.g., creating the user property on the Request object), and the request
    // handling pipeline can continue.

    const { id, emails } = profile;

    const registeredUser = await this.authService.signInWithGithub(
      id,
      emails?.length ? emails[0].value : undefined,
    );

    if (!registeredUser) {
      throw new UnauthorizedException();
    }
    return registeredUser;
  }
}
