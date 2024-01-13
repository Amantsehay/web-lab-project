import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from "class-validator";

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  username: {
    type: string;
    unique: true;
    required: true;
  };

  @IsNotEmpty()
  @IsEmail()
  email: {
    type: string;
    unique: true;
    required: true;
  };

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(60)
  password: string;
}
