import { Controller, Get, Query, Res } from '@nestjs/common';
import { GetCoursesDTO } from '@v6-academy/dto';
import { Response } from 'express';

import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('/')
  public async getCourses(
    @Query() query: GetCoursesDTO,
    @Res() response: Response,
  ) {
    const { count, data } = await this.courseService.getCourses(query);

    response.setHeader('x-total-count', count);

    return data;
  }
}
