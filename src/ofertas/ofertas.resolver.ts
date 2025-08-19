// src/ofertas/ofertas.resolver.ts
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { OfertasService } from './ofertas.service';
import { Oferta } from './entities/oferta.entity';
import { CreateOfertaInput } from './dto/create-oferta.input';
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
  createOferta ( @Args( 'input' ) input: CreateOfertaInput ) {
    return this.service.create( input );
  }
}
