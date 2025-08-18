import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artista } from './entities/artista.entity';
import { Galeria } from '../galerias/entities/galeria.entity';
import { CreateArtistaInput } from './dto/create-artista.input';

@Injectable()
export class ArtistasService {
  constructor(
    @InjectRepository(Artista) private repo: Repository<Artista>,
    @InjectRepository(Galeria) private galeriaRepo: Repository<Galeria>,
  ) { }

  async findAll(): Promise<Artista[]> {
    return this.repo.find({ relations: ['galeria', 'obras', 'exposiciones'] });
  }

  async findOne(id: number): Promise<Artista> {
    return this.repo.findOne({
      where: { id_artista: id },
      relations: ['galeria', 'obras', 'exposiciones'],
    });
  }

  async create(input: CreateArtistaInput): Promise<Artista> {
    const galeria = await this.galeriaRepo.findOne({
      where: { id_galeria: input.id_galeria },
    });

    if (!galeria) {
      throw new Error('Galería no encontrada');
    }

    const artista = this.repo.create({
      nombre: input.nombre,
      biografia: input.biografia,
      estilo: input.estilo,
      galeria,
    });

    return this.repo.save(artista);
  }
}
