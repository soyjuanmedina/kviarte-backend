// src/ofertas/ofertas.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Oferta } from './entities/oferta.entity';
import { CreateOfertaInput } from './dto/create-oferta.input';
import { Galeria } from '../galerias/entities/galeria.entity';
import { Obra } from '../obras/entities/obra.entity';

@Injectable()
export class OfertasService {
  constructor (
    @InjectRepository( Oferta ) private repo: Repository<Oferta>,
    @InjectRepository( Galeria ) private galeriaRepo: Repository<Galeria>,
    @InjectRepository( Obra ) private obraRepo: Repository<Obra>,
  ) { }

  async findAll (): Promise<Oferta[]> {
    return this.repo.find( { relations: ['galeria', 'obra'] } );
  }

  async findOne ( id: number ): Promise<Oferta> {
    return this.repo.findOne( { where: { id_oferta: id }, relations: ['galeria', 'obra'] } );
  }

  async create ( input: CreateOfertaInput ): Promise<Oferta> {
    const galeria = await this.galeriaRepo.findOne( { where: { id_galeria: input.id_galeria } } );
    const obra = await this.obraRepo.findOne( { where: { id_obra: input.id_obra } } );

    const oferta = this.repo.create( {
      precio: input.precio,
      galeria,
      obra,
    } );

    return this.repo.save( oferta );
  }
}
