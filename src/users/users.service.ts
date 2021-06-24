import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { SengridService } from 'src/common/services/sengrid.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/services/prisma.service';
import { plainToClass } from 'class-transformer';
import { UpdateInfoDto } from './dto/update-user.dto';
import { ResponseUpdateInfoDto } from './dto/responseUser.dto';
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getUsers() {
    try {
      const users = await this.prismaService.user.findMany();
      return users;
    } catch(e) {
      console.log(e.message)
    }
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
  ): Promise<UserDto> {
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

  async findOne(email: string): Promise<UserDto> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findUserWithToken(emailToken: string): Promise<CreateUserDto> {
    return await this.prismaService.user.findFirst({
      where: { hashActivation: emailToken },
    });
  }

  async updateUser(
    userId: number,
    input: UpdateInfoDto,
  ): Promise<UpdateInfoDto> {
    const userUpdated = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        ...input,
      },
    });
    return plainToClass(ResponseUpdateInfoDto, userUpdated);
  }

  async updateRole(idUser: string, newRole): Promise<UserDto> {
    const user = await this.prismaService.user.update({
      where: { id: Number(idUser) },
      data: { role: newRole.role },
    });
    return plainToClass(UserDto, user);
  }
}
