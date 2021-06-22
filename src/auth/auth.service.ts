import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    //console.log('userStored', userStored)
    const passwordChecked = await this.checkPassword(
      password,
      userStored.password,
    );
    // console.log('password', passwordChecked);
    // console.log('passwordChecked', passwordChecked);
    if (passwordChecked) {
      const { password, email, ...result } = userStored;
      //console.log('result', result)
      return result;
    }
    
    return null;
  }
  async createToken(user) {
    const payload = { username: user.useranme, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(dataRegister) {
    const user = await this.userService.createUser(dataRegister)
    return this.createToken(user)
  }

  async signIn(user: any) {
    console.log('user', user)
    const userStored = await this.validateUser(user.email, user.password)
    
    const payload = { username: userStored.useranme, id: userStored.id };
    console.log('payload', payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
