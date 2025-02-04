import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/** DTO for creating a new user */
export class CreateUserDto {
  /** User's first name */
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  /** User's last name (optional) */
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string;

  /** User's email address */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /** User's password, minimum 8 characters */
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
