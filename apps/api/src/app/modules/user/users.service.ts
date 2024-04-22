import * as bcrypt from 'bcrypt';
import { IsNull, Not, Repository } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsService } from './extended-users/student/student.service';
import { AppConfigurationService } from '../../common/appConfiguration.service';
import { InstructorService } from './extended-users/instructor/instructor.service';
import { User } from './entity/user.entity';
import { UserType } from './enums/userType.enum';
import { CreateUserDTO } from './dto/create-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { PresenceType } from './enums/presenceType.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventMessagesEnum } from '../../common/enums/event-messages.enum';
import { getCurrentDateTime, getResetPasswordTemplate, getWelcomeUserTemplate, randomPasswordString, validateEmail } from '../../common/utils';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly appConfigService: AppConfigurationService,
    private readonly studentService: StudentsService,
    private readonly instructorService: InstructorService,
    private readonly eventEmitter: EventEmitter2
  ) {}




 async getUserByEmail(email: string){
    return await this.usersRepository.findOneBy({email: email})
  }

  async create(
    createUserDto: CreateUserDTO,
    userType?: UserType
  ): Promise<User> {

    const isEmailValid = validateEmail(createUserDto.email);
    if(!isEmailValid){
      throw new Error('Invalid email format');
    }
    const existingUser = await this.getCountByEmail(createUserDto.email);
    if (existingUser>0) {
      throw new Error('Email already exists');
    }

    const isUserNameExists = await this.getCountByUsername(createUserDto.userName);

    if(isUserNameExists>0){
      throw new Error('UserName already exists');
    }

    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.userName = createUserDto.userName;
    user.email = createUserDto.email;
    user.createdDate = new Date();
    user.userType = userType ?? UserType.Student;

    

    if (createUserDto.presenceType) {
      user.presenceType = createUserDto.presenceType;
    }

    const pepper = await this.appConfigService.findByKey('pepper');
    const hash = await bcrypt.hash(
      createUserDto.password,
      Number(pepper.value)
    );
    user.pwrd = hash;

    const createdUser = await this.createUser(user);

    if (userType) {
      await this.createAssociatedEntity(createdUser, userType);
    }

    const currentDateTime = getCurrentDateTime();

    const WelcomeUserTemplate = getWelcomeUserTemplate(currentDateTime)
    //user created Event
    this.eventEmitter.emit(EventMessagesEnum.UserCreated, { email: createUserDto.email , htmlTemplate: WelcomeUserTemplate });
    
    return createdUser;
  }

  async createUser(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async findAllWithFiltersAndPagination(
    userType: string,
    presenceType: string,
    userName: string,
    page: number,
    limit: number,
  ) {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    if (userType) {
      queryBuilder.where('user.userType = :userType', { userType });
    }

    if (presenceType) {
      queryBuilder.andWhere('user.presenceType = :presenceType', { presenceType });
    }

    if (userName) {
      const searchTerm = `%${userName}%`;
      queryBuilder.andWhere('user.userName LIKE :userName', { userName: searchTerm });
    }

    queryBuilder.andWhere('user.deletedDate IS NULL')
    queryBuilder.skip((page - 1) * limit).take(limit);


    return await queryBuilder.getManyAndCount();
  }


  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async forgotPassword(email: string) {
    const user = await this.usersRepository.findOneBy({email: email});

    if(!user){
      throw new BadRequestException('invalid User');
    }

    const systemGeneratedPassword = randomPasswordString(10, process.env.RANDOM_PASSWORD_STRING);
  
    const pepper = await this.appConfigService.findByKey('pepper');

    const hash = await bcrypt.hash(
      systemGeneratedPassword,
      Number(pepper.value)
    ); 

    const newPasswordObj = {
      pwrd: hash
    }

    await this.update(user.id , newPasswordObj)
    const currentDateTime = getCurrentDateTime();


    const getHtmlTemplate = getResetPasswordTemplate(systemGeneratedPassword , currentDateTime);

    this.eventEmitter.emit(EventMessagesEnum.ForgotPassword, { email: user.email  , htmlTemplate: getHtmlTemplate });



    
    return {
      status: 200,
      message: `Password Sent to ${email} Successfully`
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
  
   return await this.usersRepository.update(id, updateUserDto);
  }

 async findOne(id: string): Promise<User> {
  const user = await this.usersRepository.findOneBy({ id: id });
  if (!user) {
    throw new NotFoundException('User not found');
  }
  return user;
  }
  

 async findOneByUsername(userName: string): Promise<User> {
    const user = await this.usersRepository
    .findOneBy({ userName: userName });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  return user;  
}

async getCountByUsername(userName: string) {
  const queryBuilder = this.usersRepository.createQueryBuilder('user');
    queryBuilder.where('user.userName = :userName', { userName })

return await queryBuilder.getCount();  
}

async getCountByEmail(email: string) {
  const queryBuilder = this.usersRepository.createQueryBuilder('user');
    queryBuilder.where('user.email = :email', { email })

return await queryBuilder.getCount();  
}

  async remove(id: string): Promise<any> {
  return  await this.usersRepository.softDelete({id});
  }

  async createAssociatedEntity(user: User, associatedEntityType: UserType) {
    let associatedEntity: any = null;

    switch (associatedEntityType) {
      case UserType.Student:
        associatedEntity = await this.studentService.create(user);
        break;

      case UserType.Instructor:
        associatedEntity = await this.instructorService.create(user);
        break;

      default:
        break;
    }

    return associatedEntity;
  }

  async getAssociatedEntity(user: User) {
    let associatedEntity: any = null;

    switch (user.userType) {
      case UserType.Student:
        associatedEntity = await this.studentService.findOneByUPN(user.email);
        break;

      case UserType.Instructor:
        associatedEntity = await this.instructorService.findOneByUPN(
          user.email
        );
        break;

      default:
        break;
    }

    return associatedEntity;
  }

  async auto() {
    console.log('OKA');
  }

  mapToDto(user: User): ReadUserDto {
    return {
      userId: user.id,
      email: user.email,
      userName: user.userName,
      lastName: user.lastName,
      firstName: user.firstName,
      userType: UserType[user.userType],
      presenceType: PresenceType[user.presenceType],
    };
  }
}
