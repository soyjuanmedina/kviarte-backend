import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ExposicionesService } from './exposiciones.service';
import { Exposicion } from './entities/exposicion.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Resolver( () => Exposicion )
@UseGuards( RolesGuard )
export class ExposicionesResolver {
  constructor ( private service: ExposicionesService ) { }

  @Query( () => [Exposicion] )
  exposiciones () {
    return this.service.findAll();
  }

  @Query( () => Exposicion )
  exposicion ( @Args( 'id' ) id: number ) {
    return this.service.findOne( id );
  }

  @Mutation( () => Exposicion )
  @Roles( 'admin', 'galeria' )
  createExposicion ( @Args( 'titulo' ) titulo: string, @Args( 'id_galeria' ) id_galeria: number, @Args( 'id_artista', { nullable: true } ) id_artista?: number ) {
    return this.service.create( { titulo, galeria: { id_galeria }, artista: id_artista ? { id_artista } : null } );
  }
}
