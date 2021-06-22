import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  UseFilters,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UserDto } from './users/dto/user.dto';
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
    console.log('body', req.user);
    return this.authService.signIn(req.user);
  }

  //@UseGuards(LocalAuthGuard)
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.signUp(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protect(@Request() req) {
    // console.log('body', req)
    return req.user;
  }

  

  // @Get('/')
  // getHello() {
  //   return this.appService.getHello();
  // }
}
