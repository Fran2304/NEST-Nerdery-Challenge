import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadUserDto } from './dto/payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET',
    });
  }
  async validate(payload) {
    if (!payload.active) {
      console.log('error');
    }
    console.log(payload);

    return {
      id: payload.id,
      username: payload.username,
      role: payload.role,
      active: payload.active,
    };
  }
}
