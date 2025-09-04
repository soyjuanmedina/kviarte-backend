import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Promotion } from './entities/promotion.entity';
import { CreatePromotionInput } from './dto/create-promotion.input';
import { Galeria } from '../galerias/entities/galeria.entity';
import { Obra } from '../obras/entities/obra.entity';

@Injectable()
export class PromotionsService {
  constructor (
    @InjectRepository( Promotion ) private promotionsRepo: Repository<Promotion>,
    @InjectRepository( Galeria ) private galeriasRepo: Repository<Galeria>,
    @InjectRepository( Obra ) private obrasRepo: Repository<Obra>,
  ) { }

  async findAll (): Promise<Promotion[]> {
    return this.promotionsRepo.find( {
      relations: ['galeria', 'artworks'],
    } );
  }

  async findOne ( id: number ): Promise<Promotion> {
    const promo = await this.promotionsRepo.findOne( {
      where: { id: id },
      relations: ['galeria', 'artworks'],
    } );
    if ( !promo ) throw new NotFoundException( `Promotion with id ${id} not found` );
    return promo;
  }

  async create ( input: CreatePromotionInput ): Promise<Promotion> {
    // Buscar la galería
    const galeria = await this.galeriasRepo.findOne( {
      where: { id_galeria: input.galleryId },
    } );
    if ( !galeria ) throw new NotFoundException( `Gallery ${input.galleryId} not found` );

    // Buscar las obras (si se pasan IDs)
    let artworks: Obra[] = [];
    if ( input.artworkIds?.length ) {
      artworks = await this.obrasRepo.find( {
        where: { id_obra: In( input.artworkIds ) },
      } );
    }

    // Crear la promoción
    const promotion = this.promotionsRepo.create( {
      code: input.code,
      description: input.description,
      discount: input.discount,
      startDate: input.startDate,
      endDate: input.endDate,
      galeria,
      artworks,
    } );

    return this.promotionsRepo.save( promotion );
  }

  async update ( id: number, input: Partial<CreatePromotionInput> ): Promise<Promotion> {
    const promotion = await this.findOne( id );

    if ( input.galleryId ) {
      const galeria = await this.galeriasRepo.findOne( { where: { id_galeria: input.galleryId } } );
      if ( !galeria ) throw new NotFoundException( `Gallery ${input.galleryId} not found` );
      promotion.galeria = galeria;
    }

    if ( input.artworkIds ) {
      const artworks = await this.obrasRepo.find( {
        where: { id_obra: In( input.artworkIds ) },
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
