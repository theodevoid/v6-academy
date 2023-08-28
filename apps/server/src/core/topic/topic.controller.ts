import { Controller, Get, Param } from '@nestjs/common';

import { TopicService } from './topic.service';

@Controller('unit')
export class TopicController {
  constructor(private readonly unitService: TopicService) {}

  @Get('/:id')
  public async getUnit(@Param('id') unitId: number) {
    return unitId;
  }
}
