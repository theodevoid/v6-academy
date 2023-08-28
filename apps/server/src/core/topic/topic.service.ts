import { Injectable } from '@nestjs/common';

import { PrismaService } from '~/lib/prisma.service';

@Injectable()
export class TopicService {
  constructor(private readonly prismaService: PrismaService) {}
}
