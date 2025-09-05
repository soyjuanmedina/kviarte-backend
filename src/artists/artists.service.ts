import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { Gallery } from '../galleries/entities/gallery.entity';
import { CreateArtistInput } from './dto/create-artist.input';

@Injectable()
export class ArtistsService {
  constructor (
    @InjectRepository( Artist ) private artistRepo: Repository<Artist>,
    @InjectRepository( Gallery ) private galleryRepository: Repository<Gallery>,
  ) { }

  async findAll (): Promise<Artist[]> {
    return this.artistRepo.find( {
      relations: ['gallery', 'artworks', 'exhibitions'], // singular: "gallery"
    } );
  }

  async findOne ( id: number ): Promise<Artist> {
    return this.artistRepo.findOne( {
      where: { id }, // antes id_artista
      relations: ['gallery', 'artworks', 'exhibitions'],
    } );
  }

  async create ( createArtistInput: CreateArtistInput ): Promise<Artist> {
    const { gallery_id, ...rest } = createArtistInput;

    const artist = this.artistRepo.create( rest );

    if ( gallery_id ) {
      const gallery = await this.galleryRepository.findOneBy( { id_gallery: gallery_id } );
      artist.gallery = gallery;
    }

    return this.artistRepo.save( artist );
  }

  async update ( id: number, data: Partial<Artist> ): Promise<Artist> {
    const artist = await this.artistRepo.findOne( {
      where: { id },
      relations: ['gallery'],
    } );

    if ( !artist ) throw new NotFoundException( `Artist with id ${id} not found` );

    Object.assign( artist, data );

    return this.artistRepo.save( artist );
  }

  async delete ( id: number ): Promise<boolean> {
    const result = await this.artistRepo.delete( id );
    return result.affected > 0;
  }
}
