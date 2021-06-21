import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private appService: AppService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    //console.log('body', req.user);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protect(@Request() req) {
    // console.log('body', req)
    return req.user;
  }

  @Get('/')
  getHello() {
    return this.appService.getHello();
  }
}
