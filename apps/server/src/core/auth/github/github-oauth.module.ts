import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '~/core/user/user.module';
import { AuthModule } from '../auth.module';
import { GithubOauthController } from './github-oauth.controller';
import { GithubOauthStrategy } from './github-oauth.strategy';

@Module({
  imports: [JwtModule, AuthModule, UserModule],
  controllers: [GithubOauthController],
  providers: [GithubOauthStrategy],
})
export class GithubOauthModule {}
