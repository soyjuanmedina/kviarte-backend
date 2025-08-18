import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exposicion } from './entities/exposicion.entity';

@Injectable()
export class ExposicionesService {
  constructor ( @InjectRepository( Exposicion ) private repo: Repository<Exposicion> ) { }

  findAll () {
    return this.repo.find( { relations: ['galeria', 'artista'] } );
  }

  findOne ( id: number ) {
    return this.repo.findOne( { where: { id_exposicion: id }, relations: ['galeria', 'artista'] } );
  }

  create ( exposicion: Partial<Exposicion> ) {
    const e = this.repo.create( exposicion );
    return this.repo.save( e );
  }

  update ( id: number, data: Partial<Exposicion> ) {
    return this.repo.update( id, data );
  }

  delete ( id: number ) {
    return this.repo.delete( id );
  }
}
