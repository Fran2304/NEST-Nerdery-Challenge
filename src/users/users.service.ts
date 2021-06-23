import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

const prisma = new PrismaClient();

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

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const passwordHashed = await this.generatePassword(createUserDto.password);
    return await prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: passwordHashed,
        firstName: '',
        lastName: '',
        role: 'CLIENT',
      },
    });
  }

  async findOne(email: string): Promise<CreateUserDto> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }
}
