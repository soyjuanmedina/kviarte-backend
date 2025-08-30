import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { ExposicionesService } from './exposiciones.service';
import { Exposicion } from './entities/exposicion.entity';
import { CreateExposicionInput } from './dto/create-exposicion.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';

@Resolver( () => Exposicion )
export class ExposicionesResolver {
  constructor ( private readonly service: ExposicionesService ) { }

  @Query( () => [Exposicion] )
  exposiciones () {
    return this.service.findAll();
  }

  @Query( () => Exposicion )
  exposicion ( @Args( 'id', { type: () => Int } ) id: number ) {
    return this.service.findOne( id );
  }

  @Mutation( () => Exposicion )
  @UseGuards( GqlAuthGuard, RolesGuard )
  @Roles( 'ADMIN', 'GALLERY' )
  createExposicion ( @Args( 'data' ) data: CreateExposicionInput ) {
    return this.service.create( data );
  }

  @Mutation( () => Boolean )
  async deleteExhibition ( @Args( 'id', { type: () => Int } ) id: number ): Promise<boolean> {
    return this.service.delete( id );
  }

  @Mutation( () => Exposicion )
  @UseGuards( GqlAuthGuard, RolesGuard )
  @Roles( 'ADMIN', 'GALLERY' )
  updateExposicion (
    @Args( 'id', { type: () => Int } ) id: number,
    @Args( 'data' ) data: CreateExposicionInput
  ) {
    return this.service.update( id, data );
  }
}

