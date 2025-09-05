import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository( User )
    private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async register ( input: RegisterInput ): Promise<User> {
    const hashed = await bcrypt.hash( input.password, 10 );
    const user = this.usersRepo.create( {
      name: input.name,
      email: input.email,
      password_hash: hashed,
      rol: input.rol?.toUpperCase() as UserRole || 'USER',
    } );
    return this.usersRepo.save( user );
  }

  async login ( input: LoginInput ) {
    const user = await this.usersRepo.findOne( { where: { email: input.email } } );
    if ( !user ) throw new UnauthorizedException( 'User no encontrado' );
    const valid = await bcrypt.compare( input.password, user.password_hash );
    if ( !valid ) throw new UnauthorizedException( 'Contraseña incorrecta' );

    const token = this.jwtService.sign( { sub: user.id, email: user.email, rol: user.rol } );
    return { access_token: token, user };
  }
}
