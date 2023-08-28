import { Module } from '@nestjs/common';

import { PrismaService } from '~/lib/prisma.service';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

@Module({
  controllers: [TopicController],
  providers: [TopicService, PrismaService],
  exports: [TopicService],
})
export class TopicModule {}
