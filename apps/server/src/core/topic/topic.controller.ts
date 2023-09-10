import { Controller, Get, Param } from '@nestjs/common';

import { TopicService } from './topic.service';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get('/')
  public async getTopics() {
    const topics = await this.topicService.getTopics();

    return topics;
  }

  @Get('/:id')
  public async getTopicById(@Param('id') id: number) {
    const topic = await this.topicService.getTopicById(id);

    return topic;
  }
}
