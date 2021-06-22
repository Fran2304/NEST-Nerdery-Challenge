import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import { UserDto } from './dto/user.dto';

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
      password: 'password',
    },
  ];

  getUsers() {
    return this.users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    //console.log('createUserDto', createUserDto)

    const createdUser = await prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password,
        firstName: '',
        lastName: '',
        role: 'CLIENT',
      },
    });

    if (!createdUser) {
      throw new UnprocessableEntityException('User cant be created');
    }

    return createdUser;
  }

  async findOne(email: string): Promise<any> {
    return this.users.find((user) => user.email === email);
  }
}
