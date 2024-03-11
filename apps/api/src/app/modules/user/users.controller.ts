import { Body, Controller, Delete, Get, Param, Post, 
  UseGuards, Req, HttpException, HttpStatus, Patch, BadRequestException, } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { UserRoles } from '@milestone-academia/api-interfaces';

import { UsersService } from './users.service';
import { StudentsService } from './extended-users/student/student.service';
import { InstructorService } from './extended-users/instructor/instructor.service';

import { UserType } from './enums/userType.enum';
import { PresenceType } from './enums/presenceType.enum';

import { ReadUserDto } from './dto/read-user.dto';
import { CreateStudentUserDto, CreateUserDto } from './dto/create-user.dto';

import { User } from './entity/user.entity';
import { Student } from './extended-users/student/entity/student.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
  
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
      console.log(`User ${createUserDto.userName} created sucessfully and email sent to ${createUserDto.email}`);
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

  @Post('forgot-password')
  async forgotPassword(@Body() data:any) {
    const {email} = data;
   return this.usersService.forgotPassword(email);

  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-user')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Req() request
  ) {
    const userName = request.username;
    const user = await this.usersService.findOneByUsername(userName);
    if (!user) {
      throw new BadRequestException('invalid User');
    }
    await this.usersService.update(user.id, updateUserDto);

    return {
      Success: true,
      Message: "Updated Successfully"
    }
  }

  @Get('userData')
  @ApiOkResponse({ description: 'User Data', type: ReadUserDto })
  @UseGuards(RolesGuard)
  @Roles([UserRoles.RetrieveUser])
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
  @UseGuards(RolesGuard)
  @Roles([UserRoles.RetrieveUser])
  async findAll(@Req() request): Promise<Partial<User>[]> {
    const users: User[] = await this.usersService.findAll();
    return users
    .filter(user => user.email !== request?.user?.upn)
    .map(user => this.usersService.mapToDto(user));
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<ReadUserDto> {
    const user = await this.usersService.findOne(id);
    const dto = this.usersService.mapToDto(user);
    await this.addExtendedUserData(dto, user);
    return dto;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const user = await this.usersService.findOne(id);
    if (user) {
      const associatedEntity = await this.usersService.getAssociatedEntity(user);
      if (associatedEntity) {
        if (user.userType = UserType.Student) {
          this.studentsService.remove(associatedEntity.id);
        }
        if (user.userType = UserType.Instructor) {
          this.instructorsService.remove(associatedEntity.id);
        }
      }
      return this.usersService.remove(id);
    }
  }

  private async addExtendedUserData(dto: ReadUserDto, user: User): Promise<void> {

    switch (user.userType) {
      case UserType.Student:
        const student = await this.studentsService.findOneByUserId(user.id);
        dto.studentData = this.studentsService.mapToDto(student);
        break;
    
      case UserType.Instructor:
        const instructor = await this.instructorsService.findOneByUserId(user.id);
        dto.instructorData = this.instructorsService.mapToDto(instructor);
        break;

      default:
        break;
    }
  }
}