import { Exclude } from 'class-transformer';

export class UserDto {
  firstName?: string;
  lastName?: string;
  email: string;

  @Exclude()
  password: string;
  username?: string;
}
