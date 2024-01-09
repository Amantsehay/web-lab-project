import {
  IS_LENGTH,
  IsEmail,
  IsNotEmpty,
} from "class-validator";

export class AuthDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
