import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExposicionesService } from './exposiciones.service';
import { ExposicionesResolver } from './exposiciones.resolver';
import { Exposicion } from './entities/exposicion.entity';
import { Galeria } from '../galerias/entities/galeria.entity';
import { Artist } from '../artists/entities/artist.entity';

@Module( {
  imports: [TypeOrmModule.forFeature( [Exposicion, Galeria, Artist] )],
  providers: [ExposicionesService, ExposicionesResolver],
} )
export class ExposicionesModule { }
