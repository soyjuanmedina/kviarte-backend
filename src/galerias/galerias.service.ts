import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Galeria } from './entities/galeria.entity';

@Injectable()
export class GaleriasService {
  constructor ( @InjectRepository( Galeria ) private repo: Repository<Galeria> ) { }

  findAll () {
    return this.repo.find( { relations: ['ofertas'] } );
  }

  findOne ( id: number ) {
    return this.repo.findOne( { where: { id_galeria: id }, relations: ['ofertas'] } );
  }

  create ( galeria: Partial<Galeria> ) {
    const g = this.repo.create( galeria );
    return this.repo.save( g );
  }

  update ( id: number, data: Partial<Galeria> ) {
    return this.repo.update( id, data );
  }

  delete ( id: number ) {
    return this.repo.delete( id );
  }
}
