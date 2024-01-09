import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
  
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const user = await this.authService.validateUser(loginDto);
    if (user) {
      return await this.authService.login(user);
    } else {
      return null;
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test(): Promise<boolean> {
    return true
  }
}