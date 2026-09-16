import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";

export class SignUpValidator {
  @IsNotEmpty({ message: "Name is required." })
  @IsString({ message: "Name must be a string." })
  name = "";

  @IsNotEmpty({ message: "Username is required." })
  @IsString({ message: "Username must be a string." })
  @MinLength(3, {
    message: "Username must be at least 3 characters.",
  })
  username = "";

  @IsNotEmpty({ message: "Email is required." })
  @IsEmail({}, {
    message: "Please enter a valid email address.",
  })
  email = "";

  @IsNotEmpty({ message: "Password is required." })
  @MinLength(6, {
    message: "Password must be at least 6 characters.",
  })
  password = "";
}