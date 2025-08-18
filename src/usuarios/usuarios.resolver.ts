import { Resolver, Query, Args } from '@nestjs/graphql';
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
  @Roles( 'admin' )
  usuarios () {
    return this.service.findAll();
  }

  @Query( () => Usuario )
  @Roles( 'admin' )
  usuario ( @Args( 'id' ) id: number ) {
    return this.service.findOne( id );
  }
}
