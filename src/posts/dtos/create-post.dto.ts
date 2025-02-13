import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { postType } from '../enums/postType.enum';
import { postStatus } from '../enums/postStatus.enum';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** DTO for creating a new blog post */
export class CreatePostDto {
  /** Post title, minimum 4 characters */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(512)
  title: string;

  /** Type of post (post/page/story/series) */
  @ApiProperty()
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  /** URL-friendly slug for the post */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  /** Current status of the post */
  @ApiProperty()
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  /** Main content of the post */
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  content?: string;

  /** JSON schema for structured data */
  @ApiPropertyOptional()
  @IsOptional()
  @IsJSON()
  schema?: string;

  /** URL to the post's featured image */
  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;

  /** Scheduled publication date */
  @ApiPropertyOptional()
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  /** List of post tags */
  @ApiPropertyOptional()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  @MinLength(3, { each: true })
  tags?: string[];

  /** Additional metadata options */
  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto;

  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
