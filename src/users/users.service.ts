import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { SengridService } from 'src/helpers/sengrid.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/prisma/prisma.service';


@Injectable()
export class UsersService {
  constructor(
    private readonly sengridService: SengridService,
    private prismaService: PrismaService){}

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

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const passwordHashed = await this.generatePassword(createUserDto.password);
    return await this.prismaService.user.create({
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

  async findOne(email: string): Promise<any> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }
}
