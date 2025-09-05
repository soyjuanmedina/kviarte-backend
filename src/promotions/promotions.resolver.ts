import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { PromotionsService } from './promotions.service';
import { Promotion } from './entities/promotion.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreatePromotionInput } from './dto/create-promotion.input';

@Resolver( () => Promotion )
@UseGuards( RolesGuard )
export class PromotionsResolver {
  constructor ( private readonly service: PromotionsService ) { }

  // --- Queries ---
  @Query( () => [Promotion] )
  promotions () {
    return this.service.findAll();
  }

  @Query( () => Promotion )
  promotion ( @Args( 'id', { type: () => Int } ) id: number ) {
    return this.service.findOne( id );
  }

  // --- Mutations ---
  @Mutation( () => Promotion )
  @Roles( 'ADMIN', 'GALLERY' )
  createPromotion ( @Args( 'input' ) input: CreatePromotionInput ) {
    return this.service.create( input );
  }

  @Mutation( () => Promotion )
  @Roles( 'ADMIN', 'GALLERY' )
  updatePromotion (
    @Args( 'id', { type: () => Int } ) id: number,
    @Args( 'input' ) input: CreatePromotionInput, // podrías crear un UpdatePromotionInput más limpio
  ) {
    return this.service.update( id, input );
  }

  @Mutation( () => Boolean )
  @Roles( 'ADMIN', 'GALLERY' )
  removePromotion ( @Args( 'id', { type: () => Int } ) id: number ) {
    return this.service.remove( id );
  }
}
