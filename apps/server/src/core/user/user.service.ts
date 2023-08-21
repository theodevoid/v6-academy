import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/lib/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getUsers() {
    return await this.prismaService.user.findMany();
  }
}
