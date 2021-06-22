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

  async checkPassword(
    passwordSent: string,
    passwordStored: string,
  ): Promise<boolean> {
    if (!passwordSent) {
      throw new UnprocessableEntityException('Password cant be empty');
    }
    const IsPasswordMatching = await bcrypt.compare(
      passwordSent,
      passwordStored,
    );
    return IsPasswordMatching;
  }

  async validateUser(email: string, password: string) {
    const userStored = await this.userService.findOne(email);
    console.log(userStored);
    // if (userStored == null) {
    //   throw new UnprocessableEntityException('ERROR: invalid email');
    // }
    const passwordChecked = await this.checkPassword(
      password,
      userStored.password,
    );
    console.log('password', passwordChecked);
    console.log('passwordChecked', passwordChecked);
    if (userStored && passwordChecked) {
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
