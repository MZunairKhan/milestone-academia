import { ApiTags } from '@nestjs/swagger';
import { Response, CookieOptions } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { USER_ROLE_SET, BaseRole } from '@milestone-academia/api-interfaces';
import { RefreshJwtAuthGuard } from './refresh-jwt-auth.guard';
  
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
      const cookieSettings: CookieOptions =
        this.authService.prepareCookieSettings();

      response.cookie(
        process.env.JWT_ACCESS_TOKEN_KEY,
        userData.access_token,
        cookieSettings
      );
       
      return {
        userData: userData.tokenData,
        refresh_token: userData.refresh_token
      }
      
    } else {
      throw new BadRequestException('invalid username and/or password');
    }
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh-token')
  async refreshToken(@Body() refresh:string ,
  @Res({ passthrough: true }) response: Response,
  @Req() request) {
  
      const userData = await this.authService.refreshJwt(request.user)
      const cookieSettings: CookieOptions =
        this.authService.prepareCookieSettings();

      response.cookie(
        process.env.JWT_ACCESS_TOKEN_KEY,
        userData.access_token,
        cookieSettings
      );

      return {
        userData: userData.tokenData,
        refresh_token: userData.refresh_token
      }
    
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test(@Req() request): Promise<boolean> {
    console.log('USER',request.user);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Req() request
  ) {
    const userName = request.username;
    return this.authService.resetPassword(resetPasswordDto, userName);
  }

  @UseGuards(JwtAuthGuard)
  @Get('role-set')
  async getRoleSet(@Req() request): Promise<BaseRole[]> {
    const userType = request?.user?.userType;
    const userTypeRoles: BaseRole[] = USER_ROLE_SET[userType];
    return userTypeRoles ?? []
  }
}
