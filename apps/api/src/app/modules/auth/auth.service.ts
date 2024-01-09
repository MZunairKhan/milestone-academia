import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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
    const payload = { 
      username: user.userName,
      upn: user.email,
      sub: user.id 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}