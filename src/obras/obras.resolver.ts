import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ObrasService } from './obras.service';
import { Obra } from './entities/obra.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Resolver( () => Obra )
@UseGuards( RolesGuard )
export class ObrasResolver {
  constructor ( private service: ObrasService ) { }

  @Query( () => [Obra] )
  obras () {
    return this.service.findAll();
  }

  @Query( () => Obra )
  obra ( @Args( 'id' ) id: number ) {
    return this.service.findOne( id );
  }

  @Mutation( () => Obra )
  @Roles( 'admin', 'galeria' )
  createObra (
    @Args( 'titulo' ) titulo: string,
    @Args( 'id_artista' ) id_artista: number,
    @Args( 'id_exposicion', { nullable: true } ) id_exposicion?: number,
  ) {
    return this.service.create( { titulo, artista: { id_artista }, exposicion: id_exposicion ? { id_exposicion } : null } );
  }
}
