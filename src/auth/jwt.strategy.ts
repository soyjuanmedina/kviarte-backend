import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy, 'jwt' ) { // 👈 nombre explícito
  constructor ( private config: ConfigService ) {
    const secret = config.get<string>( 'JWT_SECRET' ) || 'default-secret';
    console.log( 'JWT_SECRET usado en JwtStrategy:', secret );

    super( {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
      ignoreExpiration: false,
    } );
  }

  async validate ( payload: any ) {
    console.log( 'JWT payload recibido en validate():', payload );
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
