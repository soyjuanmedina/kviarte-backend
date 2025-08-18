import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository( Usuario )
    private usuariosRepo: Repository<Usuario>,
    private jwtService: JwtService,
  ) { }

  async register ( input: RegisterInput ) {
    const hashed = await bcrypt.hash( input.password, 10 );
    const user = this.usuariosRepo.create( {
      nombre: input.nombre,
      email: input.email,
      password_hash: hashed,
      rol: input.rol || 'usuario',
    } );
    return this.usuariosRepo.save( user );
  }

  async login ( input: LoginInput ) {
    const user = await this.usuariosRepo.findOne( { where: { email: input.email } } );
    if ( !user ) throw new UnauthorizedException( 'Usuario no encontrado' );
    const valid = await bcrypt.compare( input.password, user.password_hash );
    if ( !valid ) throw new UnauthorizedException( 'Contraseña incorrecta' );

    const token = this.jwtService.sign( { sub: user.id_usuario, email: user.email, rol: user.rol } );
    return { access_token: token, user };
  }
}
