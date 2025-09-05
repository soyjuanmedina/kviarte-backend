import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionsService } from './promotions.service';
import { PromotionsResolver } from './promotions.resolver';
import { Promotion } from './entities/promotion.entity';
import { Gallery } from '../galleries/entities/gallery.entity';
import { Artwork } from '../artworks/entities/artwork.entity';

@Module( {
  imports: [TypeOrmModule.forFeature( [Promotion, Gallery, Artwork] )],
  providers: [PromotionsService, PromotionsResolver],
  exports: [PromotionsService],
} )
export class PromotionsModule { }
