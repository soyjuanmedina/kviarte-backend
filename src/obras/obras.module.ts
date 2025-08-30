// src/obras/obras.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Obra } from './entities/obra.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Exposicion } from '../exposiciones/entities/exposicion.entity';
import { ObrasService } from './obras.service';
import { ObrasResolver } from './obras.resolver';

@Module( {
  imports: [TypeOrmModule.forFeature( [Obra, Artist, Exposicion] )],
  providers: [ObrasService, ObrasResolver],
  exports: [ObrasService],
} )
export class ObrasModule { }
