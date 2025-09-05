import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Gallery } from '../galleries/entities/gallery.entity';
import { Artwork } from '../artworks/entities/artwork.entity';
import { CreatePromotionInput } from './dto/create-promotion.input';
import { Promotion } from './entities/promotion.entity';

@Injectable()
export class PromotionsService {
  constructor (
    @InjectRepository( Promotion ) private promotionsRepo: Repository<Promotion>,
    @InjectRepository( Gallery ) private galleriesRepo: Repository<Gallery>,
    @InjectRepository( Artwork ) private artworksRepo: Repository<Artwork>,
  ) { }

  async findAll (): Promise<Promotion[]> {
    return this.promotionsRepo.find( {
      relations: ['gallery', 'artworks'],
    } );
  }

  async findOne ( id: number ): Promise<Promotion> {
    const promo = await this.promotionsRepo.findOne( {
      where: { id: id },
      relations: ['gallery', 'artworks'],
    } );
    if ( !promo ) throw new NotFoundException( `Promotion with id ${id} not found` );
    return promo;
  }

  async create ( input: CreatePromotionInput ): Promise<Promotion> {
    // Buscar la galería
    const gallery = await this.galleriesRepo.findOne( {
      where: { id_gallery: input.galleryId },
    } );
    if ( !gallery ) throw new NotFoundException( `Gallery ${input.galleryId} not found` );

    // Buscar las artworks (si se pasan IDs)
    let artworks: Artwork[] = [];
    if ( input.artworkIds?.length ) {
      artworks = await this.artworksRepo.find( {
        where: { id: In( input.artworkIds ) },
      } );
    }

    // Crear la promoción
    const promotion = this.promotionsRepo.create( {
      code: input.code,
      description: input.description,
      discount: input.discount,
      startDate: input.startDate,
      endDate: input.endDate,
      gallery,
      artworks,
    } );

    return this.promotionsRepo.save( promotion );
  }

  async update ( id: number, input: Partial<CreatePromotionInput> ): Promise<Promotion> {
    const promotion = await this.findOne( id );

    if ( input.galleryId ) {
      const gallery = await this.galleriesRepo.findOne( { where: { id_gallery: input.galleryId } } );
      if ( !gallery ) throw new NotFoundException( `Gallery ${input.galleryId} not found` );
      promotion.gallery = gallery;
    }

    if ( input.artworkIds ) {
      const artworks = await this.artworksRepo.find( {
        where: { id: In( input.artworkIds ) },
      } );
      promotion.artworks = artworks;
    }

    Object.assign( promotion, {
      code: input.code ?? promotion.code,
      description: input.description ?? promotion.description,
      discount: input.discount ?? promotion.discount,
      startDate: input.startDate ?? promotion.startDate,
      endDate: input.endDate ?? promotion.endDate,
    } );

    return this.promotionsRepo.save( promotion );
  }

  async remove ( id: number ): Promise<boolean> {
    const result = await this.promotionsRepo.delete( id );
    return result.affected > 0;
  }
}
