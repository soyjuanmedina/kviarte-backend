import { Resolver, Query, Args, Mutation, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ExhibitionsService } from './exhibitions.service';
import { Exhibition } from './entities/exhibition.entity';
import { CreateExhibitionInput } from './dto/create-exhibition.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { Artwork } from '../artworks/entities/artwork.entity';
import { ArtworksService } from '../artworks/artworks.service';
import { UpdateExhibitionInput } from './dto/update-exhibition.input';

@Resolver( () => Exhibition )
export class ExhibitionsResolver {
  constructor ( private readonly service: ExhibitionsService, private readonly artworksService: ArtworksService ) { }

  @Query( () => [Exhibition] )
  exhibitions () {
    return this.service.findAll();
  }

  @Query( () => Exhibition )
  exhibition ( @Args( 'id', { type: () => Int } ) id: number ) {
    return this.service.findOne( id );
  }

  @Mutation( () => Exhibition )
  @UseGuards( GqlAuthGuard, RolesGuard )
  @Roles( 'ADMIN', 'GALLERY' )
  createExhibition ( @Args( 'data' ) data: CreateExhibitionInput ) {
    return this.service.create( data );
  }

  @Mutation( () => Boolean )
  async deleteExhibition ( @Args( 'id', { type: () => Int } ) id: number ): Promise<boolean> {
    return this.service.delete( id );
  }

  @Mutation( () => Exhibition )
  @UseGuards( GqlAuthGuard, RolesGuard )
  @Roles( 'ADMIN', 'GALLERY' )
  updateExhibition (
    @Args( 'id', { type: () => Int } ) id: number,
    @Args( 'data' ) data: UpdateExhibitionInput
  ) {
    return this.service.update( id, data );
  }

  @ResolveField( () => [Artwork], { name: 'artworks' } )
  async artworks ( @Parent() exhibition: Exhibition ) {
    const { id_exhibition } = exhibition;
    const artworks = await this.artworksService.findByExhibition( id_exhibition );
    return artworks || []; // <-- DEVOLVER array vacío si no hay artworks
  }
}

