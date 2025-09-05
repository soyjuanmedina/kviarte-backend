import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibition } from './entities/exhibition.entity';
import { Gallery } from '../galleries/entities/gallery.entity';
import { Artist } from '../artists/entities/artist.entity';
import { CreateExhibitionInput } from './dto/create-exhibition.input';
import { UpdateExhibitionInput } from './dto/update-exhibition.input';

@Injectable()
export class ExhibitionsService {
  constructor (
    @InjectRepository( Exhibition )
    private readonly exhibitionRepo: Repository<Exhibition>,

    @InjectRepository( Gallery )
    private readonly galleryRepo: Repository<Gallery>,

    @InjectRepository( Artist )
    private readonly artistRepo: Repository<Artist>,
  ) { }

  async findAll (): Promise<Exhibition[]> {
    return this.exhibitionRepo.find( {
      relations: ['gallery', 'artist', 'artworks'],
    } );
  }

  async findOne ( id: number ): Promise<Exhibition> {
    return this.exhibitionRepo.findOne( {
      where: { id: id },
      relations: ['gallery', 'artist', 'artworks'],
    } );
  }

  async create ( input: CreateExhibitionInput ): Promise<Exhibition> {
    const gallery = await this.galleryRepo.findOne( {
      where: { id: input.gallery_id },
    } );
    if ( !gallery ) throw new Error( 'Gallery not found' );

    let artist: Artist = null;
    if ( input.artist_id ) {
      artist = await this.artistRepo.findOne( {
        where: { id: input.artist_id },
      } );
      if ( !artist ) throw new Error( 'Artist not found' );
    }

    const exhibition = this.exhibitionRepo.create( {
      title: input.title,
      description: input.description,
      picture: input.picture,
      gallery,
      artist,
    } );

    return this.exhibitionRepo.save( exhibition );
  }

  async update ( id: number, input: UpdateExhibitionInput ): Promise<Exhibition> {
    const exhibition = await this.exhibitionRepo.findOne( {
      where: { id: id },
      relations: ['gallery', 'artist', 'artworks'],
    } );
    if ( !exhibition ) throw new Error( 'Exhibition not found' );

    if ( input.gallery_id ) {
      const gallery = await this.galleryRepo.findOne( {
        where: { id: input.gallery_id },
      } );
      if ( !gallery ) throw new Error( 'Gallery not found' );
      exhibition.gallery = gallery;
    }

    if ( input.artist_id !== undefined ) {
      const artist = input.artist_id
        ? await this.artistRepo.findOne( { where: { id: input.artist_id } } )
        : null;
      exhibition.artist = artist;
    }

    exhibition.title = input.title ?? exhibition.title;
    exhibition.description = input.description ?? exhibition.description;
    exhibition.picture = input.picture ?? exhibition.picture;

    return this.exhibitionRepo.save( exhibition );
  }

  async delete ( id: number ): Promise<boolean> {
    const result = await this.exhibitionRepo.delete( id );
    return result.affected > 0;
  }
}
