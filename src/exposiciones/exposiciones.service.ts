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
      relations: ['galeria', 'artist', 'obras'],
    } );
  }

  async findOne ( id: number ): Promise<Exposicion> {
    return this.exposicionRepo.findOne( {
      where: { id_exposicion: id },
      relations: ['galeria', 'artist', 'obras'],
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

  async delete ( id: number ): Promise<boolean> {
    const result = await this.exposicionRepo.delete( id );
    return result.affected > 0;
  }

  async update ( id: number, input: CreateExposicionInput ): Promise<Exposicion> {
    // Buscar la exposición existente
    const exposicion = await this.exposicionRepo.findOne( {
      where: { id_exposicion: id },
      relations: ['galeria', 'artist', 'obras'],
    } );

    if ( !exposicion ) throw new Error( 'Exposición no encontrada' );

    // Actualizar galería si se proporciona
    if ( input.id_galeria ) {
      const galeria = await this.galeriaRepo.findOne( {
        where: { id_galeria: input.id_galeria },
      } );
      if ( !galeria ) throw new Error( 'Galería no encontrada' );
      exposicion.galeria = galeria;
    }

    // Actualizar artista si se proporciona
    if ( input.id_artista ) {
      const artist = await this.artistRepo.findOne( {
        where: { id_artista: input.id_artista },
      } );
      if ( !artist ) throw new Error( 'Artista no encontrado' );
      exposicion.artist = artist;
    }

    // Actualizar otros campos
    exposicion.titulo = input.titulo ?? exposicion.titulo;
    exposicion.descripcion = input.descripcion ?? exposicion.descripcion;
    exposicion.picture = input.picture ?? exposicion.picture;

    return this.exposicionRepo.save( exposicion );
  }
}
