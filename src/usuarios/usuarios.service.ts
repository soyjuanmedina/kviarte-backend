import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor ( @InjectRepository( Usuario ) private repo: Repository<Usuario> ) { }

  findAll () {
    return this.repo.find();
  }

  findOne ( id: number ) {
    return this.repo.findOne( { where: { id_usuario: id } } );
  }

  findByRole ( role: string ) {
    return this.repo.find( { where: { rol: role } } );
  }

  async delete ( id: number ): Promise<boolean> {
    const result = await this.repo.delete( id );
    return result.affected > 0;
  }
}
