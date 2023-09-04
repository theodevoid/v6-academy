import { IsOptional, IsString } from 'class-validator';

export class GetTopicsDTO {
  @IsString()
  @IsOptional()
  readonly slug?: string;
}
