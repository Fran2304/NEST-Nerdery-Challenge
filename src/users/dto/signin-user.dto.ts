import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SigninUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;
}
