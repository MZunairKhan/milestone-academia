import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InternalAuthData } from './models/internalAuthData.model';
import { AUTH_UTILS } from './auth.utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        AUTH_UTILS.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // method to validate JWT
  async validate(payload: any): Promise<InternalAuthData> {

    if (!payload) {
      throw new UnauthorizedException();
    }

    return { 
      upn: payload.upn,
      userId: payload.sub,
      username: payload.username,
      userType: payload.userType,
      presenceType: payload.presenceType
    };
  }
}