import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

import { UsersService } from './users.service';
  
@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    const user = await this.usersService.create(createUserDto);
    if (user) {
      return `User ${user.userName} created sucessfully`
    } else {
      return `Had an issue creating user ${user.userName}`
    }
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}