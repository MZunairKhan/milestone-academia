import * as bcrypt from 'bcrypt';
import { CookieOptions } from 'express';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersService } from '../user/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entity/user.entity';
import { ResetPasswordDto } from './dto/resetPassword.dto';

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
      sub: user.id,
      upn: user.email,
      userType: user.userType,
      username: user.userName,
    };

    return {
      access_token: this.jwtService.sign(payload),
      payload,
    };
  }

  prepareCookieSettings(): CookieOptions {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 24);

    return {
      httpOnly: true,
      expires: expiry,
      secure: true,
      sameSite: 'none',
    };
  }
  async resetPassword(resetPasswordDto: ResetPasswordDto, userName: string) {
    const user = await this.userService.findOneByUsername(userName);
    if (!user) {
      throw new BadRequestException('invalid User');
    }

    const isOldPasswordValid = await bcrypt.compare(
      resetPasswordDto.oldPassword,
      user.pwrd
    );

    if (!isOldPasswordValid) {
      throw new BadRequestException('invalid Password');
    }

    if (resetPasswordDto.newPassword !== resetPasswordDto.confirmPassword) {
      throw new BadRequestException(
        'New Password and Confirm password must be same'
      );
    }

    const hashedNewPassword = await bcrypt.hash(
      resetPasswordDto.newPassword,
      10
    );
    await this.userService.updatePassword(user, hashedNewPassword);

    return {
      status: true,
      message: 'Password Updated Successfully',
    };
  }
}
