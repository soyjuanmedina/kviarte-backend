import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exposicion } from './entities/exposicion.entity';
import { Galeria } from '../galerias/entities/galeria.entity';
import { Artist } from '../artists/entities/artist.entity';
import { CreateExposicionInput } from './dto/create-exposicion.input';

@Injectable()
export class ExposicionesService {
  constructor (
    @InjectRepository( Exposicion )
    private readonly exposicionRepo: Repository<Exposicion>,

    @InjectRepository( Galeria )
    private readonly galeriaRepo: Repository<Galeria>,

    @InjectRepository( Artist )
    private readonly artistRepo: Repository<Artist>,
  ) { }

  async findAll (): Promise<Exposicion[]> {
    return this.exposicionRepo.find( {
      relations: ['galeria', 'artista', 'obras'],
    } );
  }

  async findOne ( id: number ): Promise<Exposicion> {
    return this.exposicionRepo.findOne( {
      where: { id_exposicion: id },
      relations: ['galeria', 'artista', 'obras'],
    } );
  }

  async create ( input: CreateExposicionInput ): Promise<Exposicion> {
    console.log( 'input.id_galeria:', input.id_galeria, typeof input.id_galeria );
    const galeria = await this.galeriaRepo.findOne( {
      where: { id_galeria: input.id_galeria },
    } );

    if ( !galeria ) throw new Error( 'Galería no encontrada' );

    let artist: Artist = null;
    if ( input.id_artista ) {
      artist = await this.artistRepo.findOne( {
        where: { id_artista: input.id_artista },
      } );
      if ( !artist ) throw new Error( 'Artista no encontrado' );
    }

    const exposicion = this.exposicionRepo.create( {
      titulo: input.titulo,
      descripcion: input.descripcion,
      galeria,
      artist,
    } );

    return this.exposicionRepo.save( exposicion );
  }
}
