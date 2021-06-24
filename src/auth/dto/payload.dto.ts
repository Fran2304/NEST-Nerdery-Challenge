/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class PayloadUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}
