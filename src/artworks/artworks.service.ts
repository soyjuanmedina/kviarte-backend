import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artwork } from './entities/artwork.entity';
import { CreateArtworkInput } from './dto/create-artwork.input';
import { UpdateArtworkInput } from './dto/update-artwork.input';
import { Artist } from '../artists/entities/artist.entity';
import { Exhibition } from '../exhibitions/entities/exhibition.entity';
import { Gallery } from '../galleries/entities/gallery.entity';

@Injectable()
export class ArtworksService {
  constructor (
    @InjectRepository( Artwork ) private artworkRepo: Repository<Artwork>,
    @InjectRepository( Artist ) private artistRepo: Repository<Artist>,
    @InjectRepository( Exhibition ) private exhibitionRepo: Repository<Exhibition>,
    @InjectRepository( Gallery ) private galleryRepo: Repository<Gallery>,
  ) { }

  async findAll (): Promise<Artwork[]> {
    return this.artworkRepo.find( { relations: ['artist', 'gallery', 'exhibition', 'promotions'] } );
  }

  async findOne ( id: number ): Promise<Artwork> {
    return this.artworkRepo.findOne( {
      where: { id: id },
      relations: ['artist', 'gallery', 'exhibition', 'promotions', 'exhibition.gallery'],
    } );
  }

  async create ( input: CreateArtworkInput ): Promise<Artwork> {
    const artist = await this.artistRepo.findOne( { where: { id: input.artist_id } } );
    if ( !artist ) throw new NotFoundException( `Artist with id ${input.artist_id} not found` );

    const exhibition = input.exhibition_id
      ? await this.exhibitionRepo.findOne( { where: { id_exhibition: input.exhibition_id } } )
      : null;

    const gallery = input.gallery_id
      ? await this.galleryRepo.findOne( { where: { id_gallery: input.gallery_id } } )
      : null;

    const artwork = this.artworkRepo.create( {
      title: input.title,
      description: input.description,
      style: input.style,
      price: input.price,
      picture: input.picture,
      available: input.available ?? true,
      artist,
      exhibition,
      gallery,
    } );

    return this.artworkRepo.save( artwork );
  }

  async update ( id: number, input: UpdateArtworkInput ): Promise<Artwork> {
    const artwork = await this.artworkRepo.findOne( { where: { id } } );
    if ( !artwork ) throw new NotFoundException( `Artwork with id ${id} not found` );

    if ( input.artist_id ) {
      artwork.artist = await this.artistRepo.findOne( { where: { id: input.artist_id } } );
    }

    if ( input.exhibition_id !== undefined ) {
      artwork.exhibition = input.exhibition_id
        ? await this.exhibitionRepo.findOne( { where: { id_exhibition: input.exhibition_id } } )
        : null;
    }

    if ( input.gallery_id !== undefined ) {
      artwork.gallery = input.gallery_id
        ? await this.galleryRepo.findOne( { where: { id_gallery: input.gallery_id } } )
        : null;
    }

    // Actualiza los campos simples
    if ( input.title !== undefined ) artwork.title = input.title;
    if ( input.description !== undefined ) artwork.description = input.description;
    if ( input.style !== undefined ) artwork.style = input.style;
    if ( input.picture !== undefined ) artwork.picture = input.picture;
    if ( input.price !== undefined ) artwork.price = input.price;
    if ( input.available !== undefined ) artwork.available = input.available;

    return this.artworkRepo.save( artwork );
  }

  async delete ( id: number ): Promise<boolean> {
    const artwork = await this.artworkRepo.findOne( { where: { id } } );
    if ( !artwork ) throw new NotFoundException( `Artwork with id ${id} not found` );
    await this.artworkRepo.remove( artwork );
    return true;
  }

  async findByExhibition ( exhibition_id: number ): Promise<Artwork[]> {
    return this.artworkRepo.find( {
      where: { exhibition: { id_exhibition: exhibition_id } },
      relations: ['artist', 'gallery', 'exhibition', 'promotions'],
    } );
  }
}
