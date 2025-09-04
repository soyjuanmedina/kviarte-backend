import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionsService } from './promotions.service';
import { PromotionsResolver } from './promotions.resolver';
import { Promotion } from './entities/promotion.entity';
import { Galeria } from '../galerias/entities/galeria.entity';
import { Obra } from '../obras/entities/obra.entity';

@Module( {
  imports: [TypeOrmModule.forFeature( [Promotion, Galeria, Obra] )],
  providers: [PromotionsService, PromotionsResolver],
  exports: [PromotionsService],
} )
export class PromotionsModule { }
