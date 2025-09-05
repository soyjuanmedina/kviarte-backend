// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module( {
  imports: [TypeOrmModule.forFeature( [User] )], // 👈 para que funcione el repo
  providers: [UsersService, UsersResolver],
  exports: [UsersService], // 👈 para poder usarlo en AuthModule u otros
} )
export class UsersModule { }
