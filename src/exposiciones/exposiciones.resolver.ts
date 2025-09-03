import { Resolver, Query, Args, Mutation, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ExposicionesService } from './exposiciones.service';
import { Exposicion } from './entities/exposicion.entity';
import { CreateExposicionInput } from './dto/create-exposicion.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { Obra } from '../obras/entities/obra.entity';
import { ObrasService } from '../obras/obras.service';

@Resolver( () => Exposicion )
export class ExposicionesResolver {
  constructor ( private readonly service: ExposicionesService, private readonly obrasService: ObrasService ) { }

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

  @ResolveField( () => [Obra], { name: 'obras' } )
  async obras ( @Parent() exposicion: Exposicion ) {
    const { id_exposicion } = exposicion;
    const obras = await this.obrasService.findByExposicion( id_exposicion );
    return obras || []; // <-- DEVOLVER array vacío si no hay obras
  }
}

