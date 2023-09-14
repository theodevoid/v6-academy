import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class PaginationQueryParams {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  readonly limit?: number = 10;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  readonly page?: number = 1;

  @IsString()
  @IsOptional()
  readonly sortBy?: string = 'createdAt';

  @IsEnum(SortOrder)
  @IsOptional()
  readonly sortOrder?: SortOrder = SortOrder.DESC;
}
