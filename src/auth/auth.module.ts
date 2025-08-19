import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module( {
  imports: [
    ConfigModule.forRoot( { isGlobal: true } ), // Hace que ConfigService esté disponible en todo el proyecto
    TypeOrmModule.forFeature( [Usuario] ),
    JwtModule.registerAsync( {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async ( config: ConfigService ) => ( {
        secret: config.get<string>( 'JWT_SECRET' ) || 'super-secret',
        signOptions: { expiresIn: '1d' },
      } ),
    } ),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService],
} )
export class AuthModule { }
