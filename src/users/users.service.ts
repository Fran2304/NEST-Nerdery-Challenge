import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  //private readonly authService: AuthService;
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
  ) {}

  getUsers() {
    return this.prismaService.user.findMany();
    //return this.users;
  }

  async generatePassword(plainPassword: string): Promise<any> {
    if (!plainPassword) {
      throw new UnprocessableEntityException('Password cant be empty ');
    }
    const hashed = await bcrypt.hash(plainPassword, 10);
    return hashed;
  }

  // createToken(user) {
  //   console.log('user', user);
  //   const payload = { username: user.useranme, id: user.id };

  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async signUp(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    //console.log('createUserDto', createUserDto)
    const passwordHashed = await this.generatePassword(createUserDto.password);
    const createdUser = await prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: passwordHashed,
        firstName: '',
        lastName: '',
        role: 'CLIENT',
      },
    });

    console.log('createUserDto', createdUser);
    const tokenJWT = this.authService.createToken(createdUser);

    console.log('tokenJWT', tokenJWT);

    if (!createdUser) {
      throw new UnprocessableEntityException('User cant be created');
    }

    const userWithToken = { ...createdUser, tokenJWT };
    return userWithToken;
  }

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

  async findOne(email: string): Promise<any> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async signIn(email: string, password: string) {
    const userStored = await this.findOne(email);
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
}
