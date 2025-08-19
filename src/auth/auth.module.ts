import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport'; // 👈 falta
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module( {
  imports: [
    ConfigModule.forRoot( { isGlobal: true } ),
    TypeOrmModule.forFeature( [Usuario] ),
    PassportModule.register( { defaultStrategy: 'jwt', session: false } ), // 👈 clave
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
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService, PassportModule, JwtModule], // 👈 exporta también
} )
export class AuthModule { }
