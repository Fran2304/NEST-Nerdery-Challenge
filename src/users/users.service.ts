import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      useranme: 'diana98',
      email: 'diana98@test.com',
      password: 'password',
    },
    {
      id: 2,
      useranme: 'fran',
      email: 'fran@test.com',
      password: '$2b$10$.wRt61hw8SJKnYDCqr1fluVeY01Y7LDCALbSweUDA7/xkdm.AF/RW',
    },
  ];

  getUsers() {
    return this.users;
  }

  async generatePassword(plainPassword: string): Promise<string> {
    if (!plainPassword) {
      throw new UnprocessableEntityException('Password cant be empty ');
    }
    const hashed = await bcrypt.hash(plainPassword, 10);
    return hashed;
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
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

    if (!createdUser) {
      throw new UnprocessableEntityException('User cant be created');
    }
    console.log(createdUser);
    return createdUser;
  }

  async findOne(email: string): Promise<any> {
    return this.users.find((user) => user.email === email);
  }
}
