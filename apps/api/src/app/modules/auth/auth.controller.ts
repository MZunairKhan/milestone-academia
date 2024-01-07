import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
  
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<boolean> {
    return this.authService.matchPassword(loginDto);
  }
}