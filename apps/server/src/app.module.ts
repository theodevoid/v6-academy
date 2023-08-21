import { Module } from '@nestjs/common';
import { UserModule } from './core/user/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
