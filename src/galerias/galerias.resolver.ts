import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { GaleriasService } from './galerias.service';
import { Galeria } from './entities/galeria.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

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
  @Roles( 'ADMIN', 'GALLERY' ) // usuarios con estos roles pueden crear
  createGaleria (
    @Args( 'usuarioId' ) usuarioId: number,
    @Args( 'nombre' ) nombre: string,
    @Args( 'descripcion', { nullable: true } ) descripcion?: string,
    @Args( 'direccion', { nullable: true } ) direccion?: string,
    @Args( 'ciudad', { nullable: true } ) ciudad?: string,
    @Args( 'web', { nullable: true } ) web?: string,
    @Args( 'telefono', { nullable: true } ) telefono?: string,
    @Args( 'email', { nullable: true } ) email?: string,
  ) {
    return this.service.create( {
      nombre,
      descripcion,
      direccion,
      ciudad,
      web,
      telefono,
      email,
      usuario_id: usuarioId,
    } );
  }

  @Mutation( () => Boolean )
  async deleteGallery ( @Args( 'id', { type: () => Int } ) id: number ): Promise<boolean> {
    return this.service.delete( id );
  }
}
