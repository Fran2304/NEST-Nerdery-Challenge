import {
  Body,
  Controller,
  Get,
  Param,
  UseGuards,
  Patch,
  Request,
} from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateInfoDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RoleUserDto } from './dto/role-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('account')
  async update(@Request() req): Promise<UpdateInfoDto> {
    return this.usersService.updateUser(req.user.id, { ...req.body });
  }

  
  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Patch('/:idUser/role')
  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateRole(@Param('idUser') idUser: string, @Body() role: RoleUserDto) {
    return this.usersService.updateRole(idUser, role);
  }
}
