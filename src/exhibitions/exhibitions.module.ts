import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExhibitionsService } from './exhibitions.service';
import { ExhibitionsResolver } from './exhibitions.resolver';
import { Exhibition } from './entities/exhibition.entity';
import { Gallery } from '../galleries/entities/gallery.entity';
import { Artist } from '../artists/entities/artist.entity';
import { ArtworksModule } from '../artworks/artworks.module';

@Module( {
  imports: [TypeOrmModule.forFeature( [Exhibition, Gallery, Artist] ), ArtworksModule],
  providers: [ExhibitionsService, ExhibitionsResolver],
} )
export class ExhibitionsModule { }
