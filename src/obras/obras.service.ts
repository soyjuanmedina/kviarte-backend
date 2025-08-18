import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obra } from './entities/obra.entity';
import { Artista } from '../artistas/entities/artista.entity';
import { Exposicion } from '../exposiciones/entities/exposicion.entity';
import { CreateObraInput } from './dto/create-obra.input';

@Injectable()
export class ObrasService {
  constructor(
    @InjectRepository(Obra)
    private readonly obraRepository: Repository<Obra>,
    @InjectRepository(Artista)
    private readonly artistaRepository: Repository<Artista>,
    @InjectRepository(Exposicion)
    private readonly exposicionRepository: Repository<Exposicion>,
  ) { }

  async findAll(): Promise<Obra[]> {
    return this.obraRepository.find({ relations: ['artista', 'exposicion'] });
  }

  async findOne(id: number): Promise<Obra> {
    const obra = await this.obraRepository.findOne({
      where: { id_obra: id },
      relations: ['artista', 'exposicion'],
    });
    if (!obra) throw new NotFoundException(`Obra #${id} not found`);
    return obra;
  }

  async create(createObraInput: CreateObraInput): Promise<Obra> {
    const { titulo, descripcion, estilo, id_artista, id_exposicion } = createObraInput;

    const artista = await this.artistaRepository.findOne({ where: { id_artista } });
    if (!artista) throw new NotFoundException(`Artista #${id_artista} not found`);

    let exposicion: Exposicion | null = null;
    if (id_exposicion) {
      exposicion = await this.exposicionRepository.findOne({ where: { id_exposicion } });
      if (!exposicion) throw new NotFoundException(`Exposición #${id_exposicion} not found`);
    }

    const obraPartial: Partial<Obra> = {
      titulo,
      descripcion,
      artista,
      exposicion,
    };

    if (estilo) obraPartial.estilo = estilo;

    const obra = this.obraRepository.create(obraPartial);
    return this.obraRepository.save(obra);
  }

  async update(id: number, updateObraInput: CreateObraInput): Promise<Obra> {
    const obra = await this.findOne(id);

    if (updateObraInput.titulo) obra.titulo = updateObraInput.titulo;
    if (updateObraInput.descripcion) obra.descripcion = updateObraInput.descripcion;
    if (updateObraInput.estilo) obra.estilo = updateObraInput.estilo;

    if (updateObraInput.id_artista) {
      const artista = await this.artistaRepository.findOne({ where: { id_artista: updateObraInput.id_artista } });
      if (!artista) throw new NotFoundException(`Artista #${updateObraInput.id_artista} not found`);
      obra.artista = artista;
    }

    if (updateObraInput.id_exposicion) {
      const exposicion = await this.exposicionRepository.findOne({ where: { id_exposicion: updateObraInput.id_exposicion } });
      if (!exposicion) throw new NotFoundException(`Exposición #${updateObraInput.id_exposicion} not found`);
      obra.exposicion = exposicion;
    }

    return this.obraRepository.save(obra);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.obraRepository.delete(id);
    return result.affected > 0;
  }
}
