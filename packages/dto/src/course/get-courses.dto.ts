import { IsOptional, IsString } from 'class-validator';

import { PaginationQueryParams } from '../pagination';

export class GetCoursesDTO extends PaginationQueryParams {
  @IsString()
  @IsOptional()
  slug?: string;
}
