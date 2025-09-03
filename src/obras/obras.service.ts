import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obra } from './entities/obra.entity';
import { CreateObraInput } from './dto/create-obra.input';
import { Artist } from '../artists/entities/artist.entity';
import { Exposicion } from '../exposiciones/entities/exposicion.entity';
import { UpdateObraInput } from './dto/update-obra.input';

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

  async update ( id: number, input: UpdateObraInput ): Promise<Obra> {
    const obra = await this.repo.findOne( {
      where: { id_obra: id },
      relations: ['artist', 'exposicion', 'exposicion.galeria'],
    } );
    if ( !obra ) {
      throw new NotFoundException( `Obra con id ${id} no encontrada` );
    }

    if ( input.id_artista !== undefined ) {
      const artist = await this.artistRepo.findOne( { where: { id_artista: input.id_artista } } );
      obra.artist = artist || null;
    }

    if ( input.id_exposicion !== undefined ) {
      const exposicion = await this.exposicionRepo.findOne( { where: { id_exposicion: input.id_exposicion }, relations: ['galeria'] } );
      obra.exposicion = exposicion || null;
    }

    if ( input.titulo !== undefined ) obra.titulo = input.titulo;
    if ( input.descripcion !== undefined ) obra.descripcion = input.descripcion;
    if ( input.estilo !== undefined ) obra.estilo = input.estilo;
    if ( input.picture !== undefined ) obra.picture = input.picture;

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
      where: { exposicion: { id_exposicion } },
      relations: ['artist', 'galeria', 'exposicion'], // agrega las relaciones necesarias
    } );
  }
}
