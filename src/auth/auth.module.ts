// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module( {
  imports: [
    TypeOrmModule.forFeature( [Usuario] ), // 👈 para poder inyectar Repository<Usuario>
    JwtModule.register( {
      secret: process.env.JWT_SECRET || 'super-secret', // ⚠️ ponlo en .env
      signOptions: { expiresIn: '1d' },
    } ),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService],
} )
export class AuthModule { }
