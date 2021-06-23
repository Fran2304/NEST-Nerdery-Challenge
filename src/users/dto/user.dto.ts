import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserDto {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  emailVerified: boolean;
  username?: string;
  role?: Role;
  @Exclude()
  active?: boolean;

  token?: string;
}
