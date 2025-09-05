import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module'; // 👈 IMPORTANTE

@Module( {
  imports: [
    ConfigModule.forRoot( { isGlobal: true } ),
    TypeOrmModule.forFeature( [User] ),
    PassportModule.register( { defaultStrategy: 'jwt', session: false } ),
    JwtModule.registerAsync( {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async ( config: ConfigService ) => {
        const jwtSecret = config.get<string>( 'JWT_SECRET' ) || 'super-secret';
        console.log( 'JWT_SECRET desde ConfigService:', jwtSecret );
        return {
          secret: jwtSecret,
          signOptions: { expiresIn: '1d' },
        };
      },
    } ),
    UsersModule, // 👈 lo añades aquí
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService, PassportModule, JwtModule],
} )
export class AuthModule { }
