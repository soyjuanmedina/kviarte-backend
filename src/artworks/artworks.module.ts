// src/artworks/artworks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artwork } from './entities/artwork.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Exhibition } from '../exhibitions/entities/exhibition.entity';
import { ArtworksService } from './artworks.service';
import { ArtworksResolver } from './artworks.resolver';
import { Gallery } from '../galleries/entities/gallery.entity';

@Module( {
  imports: [TypeOrmModule.forFeature( [Artwork, Artist, Exhibition, Gallery] )],
  providers: [ArtworksService, ArtworksResolver],
  exports: [ArtworksService],
} )
export class ArtworksModule { }
