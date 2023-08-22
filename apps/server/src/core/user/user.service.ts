import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/lib/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getUsers() {
    return await this.prismaService.user.findMany();
  }

  public async getUser(userWhereClause: Prisma.UserWhereInput) {
    const user = await this.prismaService.user.findFirst({
      where: userWhereClause,
    });

    return user;
  }

  public async createUser(user: Prisma.UserCreateInput) {
    const newUser = await this.prismaService.user.create({
      data: user,
    });

    return newUser;
  }
}
