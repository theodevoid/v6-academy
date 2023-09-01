import { IsString } from 'class-validator';

export class GetTopicsDTO {
  @IsString()
  readonly slug: string;
}
