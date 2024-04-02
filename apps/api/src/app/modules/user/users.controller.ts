import { Body, Controller, Delete, Get, Param, Post, 
  UseGuards, Req, HttpException, HttpStatus, Patch, BadRequestException, ParseIntPipe, Query, NotFoundException, Put, } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { UserRoles } from '@milestone-academia/api-interfaces';

import { UsersService } from './users.service';
import { StudentsService } from './extended-users/student/student.service';
import { InstructorService } from './extended-users/instructor/instructor.service';

import { UserType } from './enums/userType.enum';
import { PresenceType } from './enums/presenceType.enum';

import { ReadUserDto } from './dto/read-user.dto';
import { CreatePersonUserDTO, CreateStudentUserDTO, CreateUserDTO } from './dto/create-user.dto';

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
  async create(@Body() createUserDto: CreateUserDTO): Promise<Partial<User>> {
    const user = await this.usersService.create(createUserDto, UserType.Student);
    if (user) {
      console.log(`User ${createUserDto.userName} created sucessfully and email sent to ${createUserDto.email}`);
    } else {
      throw new HttpException(`Had an issue creating user ${createUserDto.userName}`, HttpStatus.BAD_REQUEST);
    }

    return this.usersService.mapToDto(user);
  }

  @Get('paginated-user')
  @ApiQuery({ name: 'userType', required: false })
  @ApiQuery({ name: 'presenceType', required: false })
  @ApiQuery({ name: 'username', required: false })
  @ApiQuery({ name: 'page', required: false})
  @ApiQuery({ name: 'limit', required: false })
  async findPaginatedUser(
    @Query('userType') userType: string,
    @Query('presenceType') presenceType: string,
    @Query('username') username: string,
    @Query('page') page: number,
    @Query('limit',) limit: number,
  ) {

    const [users , total] = await this.usersService.findAllWithFiltersAndPagination(
      userType,
      presenceType,
      username,
      page || 1,
      limit || 15,
    );

    const totalPages = Math.ceil(total / limit);

    return {
      users: users.map(u => this.usersService.mapToDto(u)),
      total,
      page,
      limit,
      totalPages,
    };
  }


  @Post('create-user')
  async createUser(@Body() dto: CreatePersonUserDTO): Promise<any> {
    const user = await this.usersService.create(dto);
    let response = {};
    
    if (!user) {
      throw new HttpException(`Had an issue creating user ${dto.userName}`, HttpStatus.BAD_REQUEST);
    }

    if (user.userType === UserType.Student) {
      const student = this.studentsService.mapToObject(dto.personalData);
      student.associateToUser(user);
      await this.studentsService.createViaObject(student);
      const savedStudent = await this.studentsService.createViaObject(student);

      if (!savedStudent) {
        throw new HttpException(`Had an issue creating student ${dto.firstName} ${dto.lastName}`, HttpStatus.BAD_REQUEST);
      }

      response = this.studentsService.mapToDto(student);
    } else if (user.userType === UserType.Instructor) {
      const instructor = this.instructorsService.mapToObject(dto.personalData);
      instructor.associateToUser(user);
      const savedInstructor = await this.instructorsService.createViaObject(instructor);

      if (!savedInstructor) {
        throw new HttpException(`Had an issue creating instructor ${dto.firstName} ${dto.lastName}`, HttpStatus.BAD_REQUEST);
      }

      response = this.instructorsService.mapToDto(instructor);
    } else if (user.userType === UserType.Staff) {

    } else if (user.userType === UserType.Master) {

    }

    return response;
  }

  @Post('create-student')
  async createStudent(@Body() dto: CreateStudentUserDTO): Promise<Partial<Student>> {
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

  @Put('instructor/:instructorId/course/:courseId')
  async assignCourseToInstructor(
    @Param('instructorId') instructorId: string,
    @Param('courseId') courseId: string
  ): Promise<void> {
    console.log(instructorId, courseId)
    await this.instructorsService.assignCourse(instructorId, courseId);
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
    const user = await this.usersService.findOne(request.user['sub']);

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
  async remove(@Param('id') id: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (user) {
    const res =  this.usersService.remove(id);
    return res
    }else{
      throw new NotFoundException('User not found');
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