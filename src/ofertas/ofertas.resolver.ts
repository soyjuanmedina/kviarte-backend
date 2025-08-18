import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { OfertasService } from './ofertas.service';
import { Oferta } from './entities/oferta.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Resolver( () => Oferta )
@UseGuards( RolesGuard )
export class OfertasResolver {
  constructor ( private service: OfertasService ) { }

  @Query( () => [Oferta] )
  ofertas () {
    return this.service.findAll();
  }

  @Query( () => Oferta )
  oferta ( @Args( 'id' ) id: number ) {
    return this.service.findOne( id );
  }

  @Mutation( () => Oferta )
  @Roles( 'admin', 'galeria' )
  createOferta ( @Args( 'precio' ) precio: number, @Args( 'id_galeria' ) id_galeria: number, @Args( 'id_obra' ) id_obra: number ) {
    return this.service.create( { precio, galeria: { id_galeria }, obra: { id_obra } } );
  }
}
