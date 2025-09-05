import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcryptjs';

export type UserRole = 'ADMIN' | 'GALLERY' | 'USER' | 'ARTIST';

@Injectable()
export class UsersService {
  constructor ( @InjectRepository( User ) private repo: Repository<User> ) { }

  findAll () {
    return this.repo.find( { relations: ['galleries'] } );
  }

  async findOne ( id: number ) {
    const user = await this.repo.findOne( { where: { id_user: id }, relations: ['galleries'] } );
    if ( !user ) throw new NotFoundException( `User with id ${id} not found` );
    return user;
  }

  findByRole ( role: UserRole ) {
    return this.repo.find( { where: { rol: role }, relations: ['galleries'] } );
  }

  async delete ( id: number ): Promise<boolean> {
    const result = await this.repo.delete( id );
    return result.affected > 0;
  }

  // Crear usuario
  async create ( input: CreateUserInput ): Promise<User> {
    const hashed = await bcrypt.hash( input.password, 10 );
    const user = this.repo.create( { ...input, password_hash: hashed } );
    return this.repo.save( user );
  }

  // Actualizar usuario
  async update ( id: number, input: UpdateUserInput ): Promise<User> {
    const user = await this.findOne( id );
    if ( input.password ) {
      input.password = await bcrypt.hash( input.password, 10 );
    }
    Object.assign( user, input );
    return this.repo.save( user );
  }
}
