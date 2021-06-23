import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserDto {
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
}
