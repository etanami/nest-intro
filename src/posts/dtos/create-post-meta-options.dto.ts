import { IsNotEmpty, IsString } from 'class-validator';

/** DTO for post metadata options */
export class CreatePostMetaOptionsDto {
  /** Metadata key identifier */
  @IsString()
  @IsNotEmpty()
  key: string;

  /** Metadata value */
  @IsNotEmpty()
  value: any;
}
