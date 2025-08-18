// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';

@Module({
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService], // exporta AuthService si otros módulos lo necesitan
})
export class AuthModule { }
