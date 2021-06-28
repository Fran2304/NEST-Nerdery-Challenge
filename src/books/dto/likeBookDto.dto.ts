/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class LikeBookDto {
  @IsNotEmpty()
  like: boolean;
}
