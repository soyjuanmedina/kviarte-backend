import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ArtworksService } from './artworks.service';
import { Artwork } from './entities/artwork.entity';
import { CreateArtworkInput } from './dto/create-artwork.input';
import { UpdateArtworkInput } from './dto/update-artwork.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Resolver( () => Artwork )
export class ArtworksResolver {
  constructor ( private readonly service: ArtworksService ) { }

  // 🔎 Obtener todas las obras
  @Query( () => [Artwork] )
  artworks () {
    return this.service.findAll();
  }

  // 🔎 Obtener una obra por ID
  @Query( () => Artwork, { nullable: true } )
  artwork ( @Args( 'id', { type: () => Int } ) id: number ) {
    return this.service.findOne( id );
  }

  // ➕ Crear obra
  @Mutation( () => Artwork )
  @UseGuards( RolesGuard )
  @Roles( 'ADMIN', 'GALLERY' )
  createArtwork ( @Args( 'input' ) input: CreateArtworkInput ) {
    return this.service.create( input );
  }

  // ✏️ Actualizar obra
  @Mutation( () => Artwork )
  @UseGuards( RolesGuard )
  @Roles( 'ADMIN', 'GALLERY' )
  updateArtwork (
    @Args( 'id', { type: () => Int } ) id: number,
    @Args( 'input' ) input: UpdateArtworkInput,
  ) {
    return this.service.update( id, input );
  }

  // 🗑️ Eliminar obra
  @Mutation( () => Boolean )
  @UseGuards( RolesGuard )
  @Roles( 'ADMIN', 'GALLERY' )
  deleteArtwork ( @Args( 'id', { type: () => Int } ) id: number ) {
    return this.service.delete( id );
  }
}
