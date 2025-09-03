import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.repo.find( { relations: ['artist', 'exposicion'] } );
  }

  async findOne ( id: number ) {
    return this.repo.findOne( {
      where: { id_obra: id },
      relations: [
        'artist',
        'exposicion',
        'exposicion.galeria'  // <-- aquí está la clave
      ],
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
      picture: input.picture,
      artist,
      exposicion,
    } );

    return this.repo.save( obra );
  }

  async update ( id: number, input: CreateObraInput ): Promise<Obra> {
    const obra = await this.repo.findOne( { where: { id_obra: id } } );
    if ( !obra ) {
      throw new NotFoundException( `Obra con id ${id} no encontrada` );
    }

    const artist = await this.artistRepo.findOne( {
      where: { id_artista: input.id_artista },
    } );

    const exposicion = input.id_exposicion
      ? await this.exposicionRepo.findOne( {
        where: { id_exposicion: input.id_exposicion },
      } )
      : null;

    Object.assign( obra, {
      titulo: input.titulo,
      descripcion: input.descripcion,
      estilo: input.estilo,
      picture: input.picture,
      artist,
      exposicion,
    } );

    return this.repo.save( obra );
  }

  async delete ( id: number ): Promise<boolean> {
    const obra = await this.repo.findOne( { where: { id_obra: id } } );
    if ( !obra ) {
      throw new NotFoundException( `Obra con id ${id} no encontrada` );
    }
    await this.repo.remove( obra );
    return true;
  }

  async findByExposicion ( id_exposicion: number ): Promise<Obra[]> {
    return this.repo.find( {
      where: { exposicion: { id_exposicion } }, // filtramos por la relación
      relations: ['artist'], // para que GraphQL no devuelva null en artist
    } );
  }
}
