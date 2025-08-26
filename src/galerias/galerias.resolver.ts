import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { GaleriasService } from './galerias.service';
import { Galeria } from './entities/galeria.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateGalleryInput } from './dto/create-gallery.input';
import { UpdateGalleryInput } from './dto/update-gallery.input';

@Resolver( () => Galeria )
@UseGuards( RolesGuard )
export class GaleriasResolver {
  constructor ( private readonly service: GaleriasService ) { }

  @Query( () => [Galeria] )
  galerias () {
    return this.service.findAll();
  }

  @Query( () => Galeria )
  galeria ( @Args( 'id', { type: () => Int } ) id: number ) {
    return this.service.findOne( id );
  }

  @Mutation( () => Galeria )
  @Roles( 'ADMIN', 'GALLERY' )
  createGaleria ( @Args( 'input' ) input: CreateGalleryInput ) {
    return this.service.create( input );
  }

  @Mutation( () => Galeria )
  @Roles( 'ADMIN', 'GALLERY' )
  updateGaleria (
    @Args( 'id', { type: () => Int } ) id: number,
    @Args( 'data' ) data: UpdateGalleryInput
  ) {
    return this.service.update( id, data );
  }

  @Mutation( () => Boolean )
  async deleteGallery ( @Args( 'id', { type: () => Int } ) id: number ): Promise<boolean> {
    return this.service.delete( id );
  }
}
