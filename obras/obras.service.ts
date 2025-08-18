import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obra } from './entities/obra.entity';

@Injectable()
export class ObrasService {
  constructor ( @InjectRepository( Obra ) private repo: Repository<Obra> ) { }

  findAll () {
    return this.repo.find( { relations: ['artista', 'exposicion'] } );
  }

  findOne ( id: number ) {
    return this.repo.findOne( { where: { id_obra: id }, relations: ['artista', 'exposicion'] } );
  }

  create ( data: Partial<Obra> ) {
    const o = this.repo.create( data );
    return this.repo.save( o );
  }

  update ( id: number, data: Partial<Obra> ) {
    return this.repo.update( id, data );
  }

  delete ( id: number ) {
    return this.repo.delete( id );
  }
}
