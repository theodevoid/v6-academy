import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { SupabaseModule } from './core/auth/supabase/supabase.module';
import { CourseModule } from './core/course/course.module';
import { TopicModule } from './core/topic/topic.module';
import { UserController } from './core/user/user.controller';

@Module({
  imports: [TopicModule, CourseModule, PassportModule, SupabaseModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
