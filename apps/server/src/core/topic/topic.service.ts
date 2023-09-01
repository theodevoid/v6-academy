import { Injectable } from '@nestjs/common';
import { GetTopicsDTO } from '@v6-academy/dto';

import { PrismaService } from '~/lib/prisma.service';

@Injectable()
export class TopicService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getTopics(getTopicsDTO: GetTopicsDTO) {
    const topics = await this.prismaService.topic.findMany({
      where: {
        slug: getTopicsDTO.slug,
      },
      select: {
        unit: {
          include: {
            course: true,
          },
        },
      },
    });

    return topics;
  }
}
