/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  message: string;
}
