import { Injectable } from '@nestjs/common';
import { Prisma } from '@v6-academy/db';
import { GetCoursesDTO } from '@v6-academy/dto';

import { PrismaService } from '~/lib/prisma.service';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getCourses(query: GetCoursesDTO) {
    const whereCondition: Prisma.CourseWhereInput = {
      slug: query.slug ?? undefined,
    };

    const [courses, count] = await this.prismaService.$transaction([
      this.prismaService.course.findMany({
        where: whereCondition,
      }),
      this.prismaService.course.count({
        where: whereCondition,
      }),
    ]);

    return {
      data: courses,
      count,
    };
  }
}
