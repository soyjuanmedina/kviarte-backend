import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { Galeria } from '../galerias/entities/galeria.entity';
import { CreateArtistInput } from './dto/create-artist.input';

@Injectable()
export class ArtistsService {
  constructor (
    @InjectRepository( Artist ) private artistRepo: Repository<Artist>,
    @InjectRepository( Galeria ) private galeryRepository: Repository<Galeria>,
  ) { }

  async findAll (): Promise<Artist[]> {
    return this.artistRepo.find( { relations: ['galeria', 'obras', 'exposiciones'] } );
  }

  async findOne ( id: number ): Promise<Artist> {
    return this.artistRepo.findOne( {
      where: { id_artista: id },
      relations: ['galeria', 'obras', 'exposiciones'],
    } );
  }

  async create ( createArtistInput: CreateArtistInput ): Promise<Artist> {
    const { id_galeria, ...rest } = createArtistInput;

    const artist = this.artistRepo.create( rest );

    if ( id_galeria ) {
      const galeria = await this.galeryRepository.findOneBy( { id_galeria } );
      artist.galeria = galeria;
    }

    return this.artistRepo.save( artist );
  }

  async update ( id: number, data: Partial<Artist> ): Promise<Artist> {
    const artista = await this.artistRepo.findOne( { where: { id_artista: id }, relations: ['galeria'] } );
    if ( !artista ) throw new NotFoundException( `Artista con id ${id} no encontrado` );

    // Aquí ya data puede incluir galeria: null
    Object.assign( artista, data );

    return this.artistRepo.save( artista );
  }

  async delete ( id: number ): Promise<boolean> {
    const result = await this.artistRepo.delete( id );
    return result.affected > 0;
  }
}
