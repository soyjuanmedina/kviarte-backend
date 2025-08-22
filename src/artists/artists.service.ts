import { Injectable } from '@nestjs/common';
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

  async create ( createArtistaInput: CreateArtistInput ): Promise<Artist> {
    const { id_galeria, ...rest } = createArtistaInput;

    const artista = this.artistRepo.create( rest );

    if ( id_galeria ) {
      const galeria = await this.galeryRepository.findOneBy( { id_galeria } );
      artista.galeria = galeria;
    }

    return this.artistRepo.save( artista );
  }
}
