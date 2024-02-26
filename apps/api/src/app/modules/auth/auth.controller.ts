import { ApiTags } from '@nestjs/swagger';
import { Response, CookieOptions } from 'express';
import { BadRequestException, Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { BaseRole } from './roles/roles.enum';
import { USER_ROLE_SET } from './roles/userRoles';
  
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<any> {
    const user = await this.authService.validateUser(loginDto);

    if (user) {
      const userData = await this.authService.login(user);
      const cookieSettings: CookieOptions = this.authService.prepareCookieSettings();
      
      response.cookie(process.env.JWT_ACCESS_TOKEN_KEY, userData.access_token, cookieSettings);

      return userData.tokenData;
    } else {
      throw new BadRequestException("invalid username and/or password");
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test(@Req() request): Promise<boolean> {
    console.log(request.user)
    return true
  }

  @UseGuards(JwtAuthGuard)
  @Get('role-set')
  async getRoleSet(@Req() request): Promise<BaseRole[]> {
    const userType = request?.user?.userType;
    const userTypeRoles: BaseRole[] = USER_ROLE_SET[userType];
    return userTypeRoles ?? []
  }
}