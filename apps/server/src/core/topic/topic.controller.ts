import { Controller, Get, Query } from '@nestjs/common';
import { GetTopicsDTO } from '@v6-academy/dto';

import { TopicService } from './topic.service';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get('/')
  public async getTopics(@Query() getTopicsDTO: GetTopicsDTO) {
    const topics = await this.topicService.getTopics(getTopicsDTO);

    return topics;
  }
}
