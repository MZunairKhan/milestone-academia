import * as bcrypt from 'bcrypt';
import { CookieOptions } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { UsersService } from '../user/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService
  ) {}
  
  async validateUser(loginDto: LoginDto): Promise<User> {
    const user = await this.userService.findOneByUsername(loginDto.userName);

    if (user) {
      const isMatch = await bcrypt.compare(loginDto.password, user.pwrd);
      return isMatch && user;
    }
    return null;
  }

  async login(user: User) {
    const access_token = this.jwtService.sign({ 
      sub: user.id,
      upn: user.email,
      userType: user.userType,
      username: user.userName,
    });
    const tokenData = this.jwtService.decode(access_token);

    return {
      access_token,
      tokenData
    };
  }

  prepareCookieSettings(): CookieOptions {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 24);

    return {
      httpOnly: true,
      expires: expiry,
      secure: true,
      sameSite: 'none'
    }
  }
}