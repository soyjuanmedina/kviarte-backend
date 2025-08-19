import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ExposicionesService } from './exposiciones.service';
import { Exposicion } from './entities/exposicion.entity';
import { CreateExposicionInput } from './dto/create-exposicion.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';

@Resolver( () => Exposicion )
@UseGuards( GqlAuthGuard, RolesGuard ) // primero Auth, luego Roles
export class ExposicionesResolver {
  constructor ( private readonly service: ExposicionesService ) { }

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
  createExposicion ( @Args( 'data' ) data: CreateExposicionInput ) {
    return this.service.create( data );
  }
}

