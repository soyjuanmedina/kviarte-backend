import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Galeria } from './entities/galeria.entity';

@Injectable()
export class GaleriasService {
  constructor (
    @InjectRepository( Galeria )
    private readonly repo: Repository<Galeria>,
  ) { }

  async findAll (): Promise<Galeria[]> {
    return this.repo.find( { relations: ['exposiciones', 'artists'] } );
  }

  async findOne ( id: number ): Promise<Galeria> {
    return this.repo.findOne( {
      where: { id_galeria: id },
      relations: ['exposiciones', 'artists'],
    } );
  }

  async create ( input: Partial<Galeria> ): Promise<Galeria> {
    const galeria = this.repo.create( input );
    return this.repo.save( galeria );
  }

  async delete ( id: number ): Promise<boolean> {
    const result = await this.repo.delete( id );
    return result.affected > 0;
  }
}
