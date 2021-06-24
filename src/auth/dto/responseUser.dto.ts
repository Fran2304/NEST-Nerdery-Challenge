/* eslint-disable prettier/prettier */
import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ResponseUserDto {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;

  @Exclude()
  password: string;

  emailVerified: boolean;
  username?: string;
  role?: Role;
  active?: boolean;
  jwtToken?: string;
}
