import { Role } from '@prisma/client';

export class UserDto {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  emailVerified: boolean;
  username?: string;
  role: Role;
  active: boolean;
}
