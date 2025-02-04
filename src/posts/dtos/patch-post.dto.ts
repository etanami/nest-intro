import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

/** DTO for updating an existing post */
export class PatchPostDto extends PartialType(CreatePostDto) {
  /** Unique identifier of the post */
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  id: number;
}
