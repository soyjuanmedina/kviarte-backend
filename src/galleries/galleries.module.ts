// src/galleries/galleries.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleriesService } from './galleries.service';
import { GalleriesResolver } from './galleries.resolver';
import { Gallery } from './entities/gallery.entity';

@Module( {
  imports: [TypeOrmModule.forFeature( [Gallery] )],
  providers: [GalleriesService, GalleriesResolver],
  exports: [GalleriesService],
} )
export class GalleriesModule { }
