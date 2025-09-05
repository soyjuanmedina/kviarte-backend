import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artist.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';
import { Gallery } from '../galleries/entities/gallery.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver( () => Artist )
@UseGuards( RolesGuard )
export class ArtistsResolver {
  constructor (
    private service: ArtistsService,
    @InjectRepository( Gallery )
    private galleryRepository: Repository<Gallery>,
  ) { }

  // ✅ Queries
  @Query( () => [Artist] )
  artists () {
    return this.service.findAll();
  }

  @Query( () => Artist )
  artist ( @Args( 'id', { type: () => Int } ) id: number ) {
    return this.service.findOne( id );
  }

  // ✅ Mutations
  @Mutation( () => Artist )
  @Roles( 'ADMIN', 'GALLERY', 'ARTIST' )
  createArtist ( @Args( 'input' ) input: CreateArtistInput ) {
    return this.service.create( input );
  }

  @Mutation( () => Artist )
  async updateArtist (
    @Args( 'id', { type: () => Int } ) id: number,
    @Args( 'data' ) data: UpdateArtistInput,
    @Args( 'gallery_id', { type: () => Int, nullable: true } ) gallery_id?: number,
  ) {
    const updateData: Partial<Artist> = { ...data };

    if ( gallery_id !== undefined ) {
      const gallery = gallery_id
        ? await this.galleryRepository.findOneBy( { id_gallery: gallery_id } )
        : null;
      updateData.gallery = gallery;
    }

    return this.service.update( id, updateData );
  }

  @Mutation( () => Boolean )
  async deleteArtist (
    @Args( 'id', { type: () => Int } ) id: number,
  ): Promise<boolean> {
    return this.service.delete( id );
  }
}
