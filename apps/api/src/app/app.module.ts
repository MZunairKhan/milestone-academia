import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config.service';

import { UsersModule } from './modules/user/users.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    RouterModule.register([
      {
        path: 'users',
        module: UsersModule,
      },
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'common',
        module: CommonModule,
      }
    ]),
    CommonModule,
    UsersModule,
    AuthModule,
  ]
})
export class AppModule {}