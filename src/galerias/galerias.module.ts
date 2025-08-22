// src/galerias/galerias.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GaleriasService } from './galerias.service';
import { GaleriasResolver } from './galerias.resolver';
import { Galeria } from './entities/galeria.entity';

@Module( {
  imports: [TypeOrmModule.forFeature( [Galeria] )],
  providers: [GaleriasService, GaleriasResolver],
  exports: [GaleriasService],
} )
export class GaleriasModule { }
