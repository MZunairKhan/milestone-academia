import { Body, Controller, Delete, Get, Param, Post, 
  ParseIntPipe, UseGuards, Req, HttpException, HttpStatus, } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StudentsService } from './extended-users/student/student.service';
import { InstructorService } from './extended-users/instructor/instructor.service';

import { UserType } from './enums/userType.enum';
import { PresenceType } from './enums/presenceType.enum';

import { ReadUserDto } from './dto/read-user.dto';
import { CreateStudentUserDto, CreateUserDto } from './dto/create-user.dto';

import { User } from './entity/user.entity';
import { Student } from './extended-users/student/entity/student.entity';
  
@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly studentsService: StudentsService,
    private readonly instructorsService: InstructorService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    const user = await this.usersService.create(createUserDto, UserType.Student);
    if (user) {
      console.log(`User ${createUserDto.userName} created sucessfully`);
    } else {
      throw new HttpException(`Had an issue creating user ${createUserDto.userName}`, HttpStatus.BAD_REQUEST);
    }

    return this.usersService.mapToDto(user);
  }

  @Post('create-student')
  async createStudent(@Body() dto: CreateStudentUserDto): Promise<Partial<Student>> {
    const user = await this.usersService.create(dto);
    
    if (!user) {
      throw new HttpException(`Had an issue creating user ${dto.userName}`, HttpStatus.BAD_REQUEST);
    }
    
    const student = this.studentsService.mapToObject(dto.studentData);
    student.associateToUser(user);
    await this.studentsService.createViaObject(student);

    if (!user) {
      throw new HttpException(`Had an issue creating student ${dto.firstName} ${dto.lastName}`, HttpStatus.BAD_REQUEST);
    }

    return this.studentsService.mapToDto(student);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'User Data', type: ReadUserDto })
  @Get('userData')
  async findOne(@Req() request): Promise<ReadUserDto> {
    const user = await this.usersService.findOne(request.user['userId']);


    const dto: ReadUserDto = {
      userId: user.id,
      email: user.email,
      userName: user.userName,
      lastName: user.lastName,
      firstName: user.firstName,
      userType: UserType[user.userType],
      presenceType: PresenceType[user.presenceType],
    };

    await this.addExtendedUserData(dto, user);

    return dto;
  }

  @Get()
  async findAll(): Promise<Partial<User>[]> {
    const users: User[] = await this.usersService.findAll();
    return users.map(user => this.usersService.mapToDto(user));
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  private async addExtendedUserData(dto: ReadUserDto, user: User): Promise<void> {

    switch (user.userType) {
      case UserType.Student:
        const student = await this.studentsService.findOneByUser(user);
        dto.studentData = this.studentsService.mapToDto(student);
        break;
    
      case UserType.Instructor:
        const instructor = await this.instructorsService.findOneByUser(user);
        dto.instructorData = this.instructorsService.mapToDto(instructor);
        break;

      default:
        break;
    }
  }
}