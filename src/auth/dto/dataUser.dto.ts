/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class DataUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}
