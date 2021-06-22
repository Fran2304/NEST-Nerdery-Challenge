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

  
  createToken(user) {
    console.log('user', user)
    const payload = { username: user.useranme, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // async login(user: any) {
  //   const payload = { username: user.useranme, id: user.id };

  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
