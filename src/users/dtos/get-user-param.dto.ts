import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

/** DTO for user query parameters */
export class GetUserParamDto {
  /** Optional user ID for filtering */
  @ApiPropertyOptional({
    description: 'Get user with a specific id',
    example: 123,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;
}
