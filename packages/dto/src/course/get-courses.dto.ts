import { IsOptional, IsString } from 'class-validator';

export class GetCoursesDTO {
  @IsString()
  @IsOptional()
  slug?: string;
}
