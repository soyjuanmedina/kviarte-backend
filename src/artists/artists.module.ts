// src/artistas/artistas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Galeria } from '../galerias/entities/galeria.entity';
import { ArtistsService } from './artists.service';
import { ArtistsResolver } from './artists.resolver';

@Module( {
  imports: [TypeOrmModule.forFeature( [Artist, Galeria] )],
  providers: [ArtistsService, ArtistsResolver],
  exports: [ArtistsService],
} )
export class ArtistsModule { }
