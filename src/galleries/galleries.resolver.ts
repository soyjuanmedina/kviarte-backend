import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { GalleriesService } from './galleries.service';
import { Gallery } from './entities/gallery.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateGalleryInput } from './dto/create-gallery.input';
import { UpdateGalleryInput } from './dto/update-gallery.input';

@Resolver( () => Gallery )
@UseGuards( RolesGuard )
export class GalleriesResolver {
  constructor ( private readonly service: GalleriesService ) { }

  @Query( () => [Gallery] )
  galleries () {
    return this.service.findAll();
  }

  @Query( () => Gallery )
  gallery ( @Args( 'id', { type: () => Int } ) id: number ) {
    return this.service.findOne( id );
  }

  @Mutation( () => Gallery )
  @Roles( 'ADMIN', 'GALLERY' )
  createGallery ( @Args( 'input' ) input: CreateGalleryInput ) {
    // input.name en lugar de input.nombre
    return this.service.create( input );
  }

  @Mutation( () => Gallery )
  @Roles( 'ADMIN', 'GALLERY' )
  updateGallery (
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
