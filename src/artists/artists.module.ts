// src/artistas/artistas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Gallery } from '../galleries/entities/gallery.entity';
import { ArtistsService } from './artists.service';
import { ArtistsResolver } from './artists.resolver';

@Module( {
  imports: [TypeOrmModule.forFeature( [Artist, Gallery] )],
  providers: [ArtistsService, ArtistsResolver],
  exports: [ArtistsService],
} )
export class ArtistsModule { }
