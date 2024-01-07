import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService
  ) {}

  async matchPassword(loginDto: LoginDto) {
    const user = await this.userService.findOneByUsername(loginDto.userName);

    const isMatch = await bcrypt.compare(loginDto.password, user.pwrd);
    console.log("isMatch " + isMatch);

    return isMatch;
  }
}