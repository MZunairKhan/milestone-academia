import { Body, Controller, Delete, Get, Param, Post, 
  ParseIntPipe, UseGuards, Req, HttpException, HttpStatus, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserType } from './enums/userType.enum';
import { PresenceType } from './enums/presenceType.enum';

import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RetrieveUserDto } from './dto/retrieve-user.dto';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    const user = await this.usersService.create(createUserDto);
    if (user) {
      console.log(`User ${user.userName} created sucessfully`);
    } else {
      throw new HttpException(`Had an issue creating user ${user.userName}`, HttpStatus.BAD_REQUEST);
    }

    return {
      email: user.email,
      userName: user.userName,
      lastName: user.lastName,
      firstName: user.firstName,
      userType: user.userType,
      presenceType: user.presenceType
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('userData')
  async findOne(@Req() request): Promise<RetrieveUserDto> {
    const user = await this.usersService.findOne(request.user['userId']);
    const dto: RetrieveUserDto = {
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      presenceType: PresenceType[user.presenceType],
      userName: user.userName,
      userType: UserType[user.userType]
    }

    return dto;
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}