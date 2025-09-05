import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from './entities/gallery.entity';

@Injectable()
export class GalleriesService {
  constructor (
    @InjectRepository( Gallery )
    private readonly repo: Repository<Gallery>,
  ) { }

  findAll (): Promise<Gallery[]> {
    return this.repo.find( {
      relations: ['owner', 'exhibitions', 'artists', 'artworks', 'promotions'],
    } );
  }

  async findOne ( id: number ): Promise<Gallery> {
    return this.repo.findOne( {
      where: { id: id },
      relations: ['owner', 'exhibitions', 'artists', 'artworks', 'promotions'],
    } );
  }

  async create ( input: Partial<Gallery> & { owner_id?: number } ): Promise<Gallery> {
    const gallery = this.repo.create( input );

    if ( input.owner_id ) {
      gallery.owner = { id: input.owner_id } as any; // referencia al propietario
      delete ( gallery as any ).owner_id;
    }

    const saved = await this.repo.save( gallery );
    return this.findOne( saved.id );
  }

  async update ( id: number, data: Partial<Gallery> ): Promise<Gallery> {
    const gallery = await this.repo.findOne( { where: { id: id } } );
    if ( !gallery ) throw new NotFoundException( `Gallery with id ${id} not found` );

    Object.assign( gallery, data );

    // Si viene owner_id, actualizar owner
    if ( 'owner_id' in data ) {
      gallery.owner = data.owner_id ? { id: data.owner_id } as any : null;
      delete ( gallery as any ).owner_id;
    }

    await this.repo.save( gallery );
    return this.findOne( id );
  }

  async delete ( id: number ): Promise<boolean> {
    const result = await this.repo.delete( id );
    return result.affected > 0;
  }
}
