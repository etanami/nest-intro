import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { postType } from '../enums/postType.enum';
import { postStatus } from '../enums/postStatus.enum';
import { CreatePostMetaOptionsDto } from './create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  title: string;

  @ApiProperty()
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @ApiProperty()
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  featuredImageUrl?: string;

  @ApiPropertyOptional()
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto[];
}
