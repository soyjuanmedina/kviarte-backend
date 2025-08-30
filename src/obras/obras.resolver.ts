import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ObrasService } from './obras.service';
import { Obra } from './entities/obra.entity';
import { CreateObraInput } from './dto/create-obra.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Resolver( () => Obra )
@UseGuards( RolesGuard )
export class ObrasResolver {
  constructor ( private readonly service: ObrasService ) { }

  @Query( () => [Obra] )
  obras () {
    return this.service.findAll();
  }

  @Query( () => Obra )
  obra ( @Args( 'id', { type: () => Int } ) id: number ) {
    return this.service.findOne( id );
  }

  @Mutation( () => Obra )
  @Roles( 'ADMIN', 'GALLERY' )
  createObra ( @Args( 'input' ) input: CreateObraInput ) {
    return this.service.create( input );
  }

  @Mutation( () => Obra )
  @Roles( 'ADMIN', 'GALLERY' )
  updateObra (
    @Args( 'id', { type: () => Int } ) id: number,
    @Args( 'input' ) input: CreateObraInput
  ) {
    return this.service.update( id, input );
  }

  @Mutation( () => Boolean )
  @Roles( 'ADMIN', 'GALLERY' )
  deleteObra ( @Args( 'id', { type: () => Int } ) id: number ) {
    return this.service.delete( id );
  }
}
