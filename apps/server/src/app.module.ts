import { Module } from '@nestjs/common';

import { AuthModule } from './core/auth/auth.module';
import { CourseModule } from './core/course/course.module';
import { TopicModule } from './core/topic/topic.module';
import { UserModule } from './core/user/user.module';

@Module({
  imports: [UserModule, AuthModule, TopicModule, CourseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
