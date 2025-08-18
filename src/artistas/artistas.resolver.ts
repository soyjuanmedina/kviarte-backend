import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ArtistasService } from './artistas.service';
import { Artista } from './entities/artista.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Resolver( () => Artista )
@UseGuards( RolesGuard )
export class ArtistasResolver {
  constructor ( private service: ArtistasService ) { }

  @Query( () => [Artista] )
  artistas () {
    return this.service.findAll();
  }

  @Query( () => Artista )
  artista ( @Args( 'id' ) id: number ) {
    return this.service.findOne( id );
  }

  @Mutation( () => Artista )
  @Roles( 'admin', 'galeria' )
  createArtista ( @Args( 'nombre' ) nombre: string, @Args( 'id_galeria' ) id_galeria: number ) {
    return this.service.create( { nombre, galeria: { id_galeria } } );
  }
}
