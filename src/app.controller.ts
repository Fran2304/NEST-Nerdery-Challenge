import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  UseFilters,
  Put,
  Req,
  Patch,
  Param,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { ResponseUserDto } from './auth/dto/responseUser.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { CreateUserDto } from './users/dto/create-user.dto';
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
    //console.log('body', req.user);
    return this.authService.signIn(req.user);
  }

  // //@UseGuards(LocalAuthGuard)
  // @Post('signup')
  // async signup(@Body() createUserDto: CreateUserDto): Promise<any> {
  //   return this.authService.signUp(createUserDto);
  // }

  //@UseGuards(LocalAuthGuard)
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return this.authService.signUp(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protect(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('account')
  async update(@Request() req): Promise<UpdateInfoDto> {
    console.log(req.user.id);
    return this.userService.updateUser(req.user.id, { ...req.body });
  }
}
