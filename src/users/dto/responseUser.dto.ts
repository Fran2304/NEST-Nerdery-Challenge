/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ResponseUpdateInfoDto {
  @IsOptional()
  firstName?: string;
  @IsOptional()
  lastName?: string;
  @IsOptional()
  email?: string;
  @IsOptional()
  @Exclude()
  password?: string;
  @IsOptional()
  username?: string;
}
