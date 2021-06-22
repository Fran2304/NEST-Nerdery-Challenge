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
import { SengridService } from 'src/helpers/sengrid.service';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  constructor(private readonly sengridService: SengridService) {}
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

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    //console.log('createUserDto', createUserDto)

    const createdUser = await prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password,
        active: true,
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
