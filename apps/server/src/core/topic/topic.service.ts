import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '~/lib/prisma.service';

@Injectable()
export class TopicService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getTopics() {
    const topics = await this.prismaService.topic.findMany({
      include: {
        unit: {
          include: {
            course: true,
          },
        },
      },
    });

    return topics;
  }

  public async getTopicById(id: number) {
    const topic = await this.prismaService.topic.findUnique({
      where: {
        id,
      },
    });

    if (!topic) throw new NotFoundException('topic not found');

    return topic;
  }
}
