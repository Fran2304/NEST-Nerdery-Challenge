import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from './decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './enums/role.enum';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // getUsers() {
  //   return this.usersService.getUsers();
  // }

  @Get()
  @Roles(Role.MANAGER)
  getUsers() {
    return this.usersService.getUsers();
  }
}
