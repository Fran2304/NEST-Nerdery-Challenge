import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const userStored = await this.userService.findOne(email);
    console.log(userStored);
    // if (userStored == null) {
    //   throw new UnprocessableEntityException('ERROR: invalid email');
    // }
    if (userStored && userStored.password === password) {
      const { password, email, ...result } = userStored;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.useranme, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
