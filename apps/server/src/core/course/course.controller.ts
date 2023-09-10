import { Controller, Get, Query } from '@nestjs/common';
import { GetCoursesDTO } from '@v6-academy/dto';

import { PaginationService } from '../pagination/pagination.service';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly paginationService: PaginationService,
  ) {}

  @Get('/')
  public async getCourses(@Query() query: GetCoursesDTO) {
    const { count, data } = await this.courseService.getCourses(query);

    return this.paginationService.buildPaginationResponse<
      (typeof data)[number]
    >(data, {
      count,
    });
  }
}
