import { IsJSON, IsNotEmpty } from 'class-validator';

/** DTO for post metadata options */
export class CreatePostMetaOptionsDto {
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
