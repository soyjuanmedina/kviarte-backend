import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artista } from './entities/artista.entity';

@Injectable()
export class ArtistasService {
  constructor ( @InjectRepository( Artista ) private repo: Repository<Artista> ) { }

  findAll () {
    return this.repo.find( { relations: ['galeria', 'obras'] } );
  }

  findOne ( id: number ) {
    return this.repo.findOne( { where: { id_artista: id }, relations: ['galeria', 'obras'] } );
  }

  create ( artista: Partial<Artista> ) {
    const a = this.repo.create( artista );
    return this.repo.save( a );
  }

  update ( id: number, data: Partial<Artista> ) {
    return this.repo.update( id, data );
  }

  delete ( id: number ) {
    return this.repo.delete( id );
  }
}
