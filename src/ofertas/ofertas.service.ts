import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Oferta } from './entities/oferta.entity';

@Injectable()
export class OfertasService {
  constructor ( @InjectRepository( Oferta ) private repo: Repository<Oferta> ) { }

  findAll () {
    return this.repo.find( { relations: ['galeria', 'obra'] } );
  }

  findOne ( id: number ) {
    return this.repo.findOne( { where: { id_oferta: id }, relations: ['galeria', 'obra'] } );
  }

  create ( data: Partial<Oferta> ) {
    const o = this.repo.create( data );
    return this.repo.save( o );
  }

  update ( id: number, data: Partial<Oferta> ) {
    return this.repo.update( id, data );
  }

  delete ( id: number ) {
    return this.repo.delete( id );
  }
}
