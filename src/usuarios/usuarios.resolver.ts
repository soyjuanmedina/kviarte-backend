import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Resolver( () => Usuario )
@UseGuards( RolesGuard )
export class UsuariosResolver {
  constructor ( private service: UsuariosService ) { }

  @Query( () => [Usuario] )
  @Roles( 'ADMIN' )
  usuarios () {
    return this.service.findAll();
  }

  @Query( () => Usuario )
  @Roles( 'ADMIN' )
  usuario ( @Args( 'id', { type: () => Int } ) id: number ) {
    return this.service.findOne( id );
  }

  @Mutation( () => Boolean )
  @Roles( 'ADMIN' )
  async deleteUsuario ( @Args( 'id', { type: () => Int } ) id: number ): Promise<boolean> {
    return this.service.delete( id );
  }
}
