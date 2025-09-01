import { Resolver, Query, Args, Mutation, Int, Float } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artist.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';
import { Galeria } from '../galerias/entities/galeria.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver( () => Artist )
@UseGuards( RolesGuard )
export class ArtistsResolver {
  constructor ( private service: ArtistsService, @InjectRepository( Galeria ) private galleryRepository: Repository<Galeria> ) { }

  @Query( () => [Artist] )
  artistas () {
    return this.service.findAll();
  }

  @Query( () => Artist )
  artista ( @Args( 'id' ) id: number ) {
    return this.service.findOne( id );
  }

  @Mutation( () => Artist )
  @Roles( 'ADMIN', 'GALLERY', 'ARTIST' )
  createArtist ( @Args( 'input' ) input: CreateArtistInput ) {
    return this.service.create( input );
  }

  @Mutation( () => Artist )
  async updateArtist (
    @Args( 'id', { type: () => Float } ) id: number,
    @Args( 'data' ) data: UpdateArtistInput,
    @Args( 'id_galeria', { type: () => Float, nullable: true } ) id_galeria?: number
  ) {
    const updateData: Partial<Artist> = { ...data };

    // Esto asegura que galeria se actualice correctamente
    if ( 'id_galeria' in data || id_galeria !== undefined ) {
      const galeria = id_galeria ? await this.galleryRepository.findOneBy( { id_galeria } ) : null;
      updateData.galeria = galeria;
    }

    return this.service.update( id, updateData );
  }

  @Mutation( () => Boolean )
  async deleteArtist ( @Args( 'id', { type: () => Int } ) id: number ): Promise<boolean> {
    return this.service.delete( id );
  }
}

