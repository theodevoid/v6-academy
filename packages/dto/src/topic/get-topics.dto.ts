import { IsOptional, IsString } from 'class-validator';

import { PaginationQueryParams } from '../pagination';

export class GetTopicsDTO extends PaginationQueryParams {
  @IsString()
  @IsOptional()
  readonly slug?: string;
}
