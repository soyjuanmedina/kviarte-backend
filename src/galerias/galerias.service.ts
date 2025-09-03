import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Galeria } from './entities/galeria.entity';

@Injectable()
export class GaleriasService {
  constructor (
    @InjectRepository( Galeria )
    private readonly repo: Repository<Galeria>,
  ) { }

  findAll (): Promise<Galeria[]> {
    return this.repo.find( {
      relations: ['propietario', 'exposiciones', 'artists'],
    } );
  }

  async findOne ( id: number ): Promise<Galeria> {
    return this.repo.findOne( {
      where: { id_galeria: id },
      relations: ['propietario', 'exposiciones', 'artists'],
    } );
  }

  async create ( input: Partial<Galeria> & { usuario_id?: number } ): Promise<Galeria> {
    const galeria = this.repo.create( input );

    if ( input.usuario_id ) {
      galeria.propietario = { id_usuario: input.usuario_id } as any; // 'as any' para que TypeORM acepte solo la referencia
      delete ( galeria as any ).usuario_id; // eliminar para que no intente asignar columna inexistente
    }

    const saved = await this.repo.save( galeria );
    // Cargar relaciones antes de devolver
    return this.findOne( saved.id_galeria );
  }

  async update ( id: number, data: Partial<Galeria> ): Promise<Galeria> {
    const galeria = await this.repo.findOne( { where: { id_galeria: id } } );
    if ( !galeria ) throw new NotFoundException( `Galería con id ${id} no encontrada` );
    Object.assign( galeria, data );
    await this.repo.save( galeria );
    // Cargar relaciones antes de devolver
    return this.findOne( id );
  }

  async delete ( id: number ): Promise<boolean> {
    const result = await this.repo.delete( id );
    return result.affected > 0;
  }
}
