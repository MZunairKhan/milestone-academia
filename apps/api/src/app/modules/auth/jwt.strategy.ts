import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request as RequestType } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // method to validate JWT
  async validate(payload: any) {
    return { 
      upn: payload.upn,
      userId: payload.sub,
      username: payload.username,
      userType: payload.userType,
    };
  }

  // method to extract custom JWT set in HTTP only cookies
  private static extractJWT(req: RequestType): string | null {
    const tokenKey = process.env.JWT_ACCESS_TOKEN_KEY;

    if (
      req.cookies &&
      tokenKey in req.cookies &&
      req.cookies[tokenKey].length > 0
    ) {
      return req.cookies[tokenKey];
    }
    return null;
  }
}