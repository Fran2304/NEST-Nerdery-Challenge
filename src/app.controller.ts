import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  UseFilters,
  Param,
  Patch,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { MessageDto } from './auth/dto/message.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { CreateUserDto } from './users/dto/create-user.dto';
import { InputInfoUserDto } from './users/dto/input-user.dto';
import { SigninUserDto } from './users/dto/signin-user.dto';
import { UpdateInfoDto } from './users/dto/update-user.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Post('signup')
  async signup(@Body() body: InputInfoUserDto): Promise<MessageDto> {
    return this.authService.signUp(body);
  }

  @Post('confirm/:tokenEmail')
  confirm(@Param('tokenEmail') tokenEmail: string) {
    return this.authService.confirmEmail(tokenEmail);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protect(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('account')
  async update(@Request() req): Promise<UpdateInfoDto> {
    return this.userService.updateUser(req.user.id, { ...req.body });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('logout')
  async logout(@Request() req): Promise<UpdateInfoDto> {
    return this.userService.signOut(req.user.id);
  }
}
