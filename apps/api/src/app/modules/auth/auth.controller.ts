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
import { LoggingMessages } from 'apps/api/src/assets/logging-messages';
import { LoggerEnum } from 'apps/api/src/logger/logging.enum';
import { LoggerService } from 'apps/api/src/logger/logger.service ';
  
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly logger: LoggerService
    ) {}

    infoLog(methodName: string ,  message: string){
      const log =  {
        className: AuthController.name,
        methodName: methodName ,
        message: message,
        level: LoggerEnum.Info
      }
      this.logger.info(log)
      this.logger.saveLog(log)
     }
  
     errorLog(methodName: string ,  message: string , error: any, stackTrace: any){
      const log =  {
        className: AuthController.name,
        methodName: methodName ,
        message: message,
        error: error,
        stackTrace: stackTrace
      }
      this.logger.error(log);
      throw error;

     }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<any> {
    try{
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
      
        this.infoLog(AuthController.prototype.login.name,
          LoggingMessages.auth.info.loginSuccess(loginDto.userName),)
        return {
          userData: userData.tokenData,
          refresh_token: userData.refresh_token
        }
        
      } else {
        throw new BadRequestException('invalid username and/or password');
      }
    }catch(error){
      this.errorLog(AuthController.prototype.login.name,
        LoggingMessages.auth.error.loginFailed(loginDto.userName),
        error,'')
     
    }
   
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh-token')
  async refreshToken(@Body() refresh:string ,
  @Res({ passthrough: true }) response: Response,
  @Req() request) {
    try{
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
      }
    }catch(error){
      this.errorLog(AuthController.prototype.refreshToken.name,
        LoggingMessages.auth.error.refreshTokenFailed(request.id),
        error,'')
     
    }
     
    
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test(@Req() request): Promise<boolean> {
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Req() request
  ) {
    try{
      const userName = request.username;
      const response  =  this.authService.resetPassword(resetPasswordDto, userName);

      this.infoLog(AuthController.prototype.resetPassword.name,
        LoggingMessages.auth.info.resetPasswordSuccess(request.id), )

      return response
    }catch(error){
      this.errorLog(AuthController.prototype.resetPassword.name,
        LoggingMessages.auth.error.resetPasswordFailed(request.id),
        error,'')
     ;
    }
   
  }

  @UseGuards(JwtAuthGuard)
  @Get('role-set')
  async getRoleSet(@Req() request): Promise<BaseRole[]> {
    const userType = request?.user?.userType;
    const userTypeRoles: BaseRole[] = USER_ROLE_SET[userType];
    return userTypeRoles ?? []
  }
}
