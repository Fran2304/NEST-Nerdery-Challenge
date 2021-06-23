import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SengridService } from 'src/common/services/sengrid.service';
import { generateHash } from 'src/common/helpers/generatorEmailHash';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private sengridService: SengridService,
    private prismaService: PrismaService,
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
    //console.log('password', passwordChecked);
    // console.log('passwordChecked', passwordChecked);
    if (userStored && passwordChecked) {
      const { password, email, ...result } = userStored;

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
    const confirmationCode = generateHash();
    await this.sengridService.sendMailOfConfirmationCode(
      dataRegister.email,
      confirmationCode,
    );
    await this.userService.createUser(dataRegister, confirmationCode);
    //return this.createToken(user);
    return {
      message: 'Check your email',
    };
  }

  async confirmEmail(tokenEmail) {
    const user = await this.userService.findUserWithToken(tokenEmail);
    if (!user) throw new NotFoundException('Not found User');
    return this.createToken(user);
  }

  async signIn(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return this.createToken(payload);
  }
}
