import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetUserParamDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;
}
