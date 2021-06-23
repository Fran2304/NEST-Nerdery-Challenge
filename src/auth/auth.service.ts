import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { DataUserDto } from './dto/dataUser.dto';
import { PayloadUserDto } from './dto/payload.dto';
import { TokenDto } from './dto/token.dto';
import { ResponseUserDto } from 'src/auth/dto/responseUser.dto';
import { plainToClass } from 'class-transformer';

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

    const passwordChecked = await this.checkPassword(
      password,
      userStored.password,
    );
    if (userStored && passwordChecked) {
      const { password, email, ...result } = userStored;

      return result;
    }

    return null;
  }
  async createToken(user): Promise<TokenDto> {
    const payload = { username: user.username, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(dataRegister: DataUserDto): Promise<ResponseUserDto> {
    const user = await this.userService.createUser(dataRegister);
    const token = await this.createToken(user);
    const data = {
      ...user,
      jwtToken: token.access_token,
    };
    const formatedDate = plainToClass(ResponseUserDto, data);
    return formatedDate;
  }

  async signIn(user: PayloadUserDto): Promise<TokenDto> {
    const payload = { username: user.username, sub: user.userId };
    return this.createToken(payload);
  }
}
