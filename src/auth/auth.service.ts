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
      password: hashed,
      role: input.role?.toUpperCase() as UserRole || 'USER',
    } );
    return this.usersRepo.save( user );
  }

  async login ( input: LoginInput ) {
    const userEntity = await this.usersRepo.findOne( {
      where: { email: input.email },
      select: ['id', 'name', 'email', 'role', 'password'], // aseguramos traer lo necesario
    } );

    if ( !userEntity ) throw new UnauthorizedException( 'User no encontrado' );

    const valid = await bcrypt.compare( input.password, userEntity.password );
    if ( !valid ) throw new UnauthorizedException( 'Contraseña incorrecta' );

    const token = this.jwtService.sign( {
      sub: userEntity.id,
      email: userEntity.email,
      role: userEntity.role,
    } );

    // Retornamos un objeto User “limpio” para GraphQL
    const user = {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      role: userEntity.role,
      registrationDate: userEntity.registrationDate,
    };

    return { token, user }; // ⚠️ llamamos token, no access_token
  }

}
