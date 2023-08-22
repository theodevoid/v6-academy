import { Module } from '@nestjs/common';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
