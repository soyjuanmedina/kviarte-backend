import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obra } from './entities/obra.entity';
import { CreateObraInput } from './dto/create-obra.input';
import { Artist } from '../artists/entities/artist.entity';
import { Exposicion } from '../exposiciones/entities/exposicion.entity';

@Injectable()
export class ObrasService {
  constructor (
    @InjectRepository( Obra ) private repo: Repository<Obra>,
    @InjectRepository( Artist ) private artistRepo: Repository<Artist>,
    @InjectRepository( Exposicion ) private exposicionRepo: Repository<Exposicion>,
  ) { }

  async findAll (): Promise<Obra[]> {
    return this.repo.find( { relations: ['artista', 'exposicion'] } );
  }

  async findOne ( id: number ): Promise<Obra> {
    return this.repo.findOne( {
      where: { id_obra: id },
      relations: ['artist', 'exposicion'],
    } );
  }

  async create ( input: CreateObraInput ): Promise<Obra> {
    const artist = await this.artistRepo.findOne( {
      where: { id_artista: input.id_artista },
    } );

    const exposicion = input.id_exposicion
      ? await this.exposicionRepo.findOne( {
        where: { id_exposicion: input.id_exposicion },
      } )
      : null;

    const obra = this.repo.create( {
      titulo: input.titulo,
      descripcion: input.descripcion,
      estilo: input.estilo,
      artist,
      exposicion,
    } );

    return this.repo.save( obra );
  }
}
