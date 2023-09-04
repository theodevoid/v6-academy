import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@v6-academy/db';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return;

    return Promise.all([
      this.comment.deleteMany(),
      this.category.deleteMany(),
      this.topic.deleteMany(),
      this.unit.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
