import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { SengridService } from 'src/common/services/sengrid.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  getUsers() {
    return this.prismaService.user.findMany();
  }

  async generatePassword(plainPassword: string): Promise<string> {
    if (!plainPassword) {
      throw new UnprocessableEntityException('Password cant be empty ');
    }
    const hashed = await bcrypt.hash(plainPassword, 10);
    return hashed;
  }

  async createUser(
    createUserDto: CreateUserDto,
    tokenEmail: string,
  ): Promise<CreateUserDto> {
    const passwordHashed = await this.generatePassword(createUserDto.password);
    return await this.prismaService.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: passwordHashed,
        firstName: '',
        lastName: '',
        role: 'CLIENT',
        hashActivation: tokenEmail,
      },
    });
  }

  async findOne(email: string): Promise<any> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findUserWithToken(emailToken: string): Promise<any> {
    return await this.prismaService.user.findFirst({
      where: { hashActivation: emailToken },
    });
  }
}
