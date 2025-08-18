import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NewsletterService } from './newsletter.service';
import { Subscription } from './entities/subscription.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Resolver( () => Subscription )
@UseGuards( RolesGuard )
export class NewsletterResolver {
  constructor ( private service: NewsletterService ) { }

  @Query( () => [Subscription] )
  subscriptions () {
    return this.service.findAll();
  }

  @Mutation( () => Subscription )
  subscribe ( @Args( 'email' ) email: string ) {
    return this.service.subscribe( email );
  }

  @Mutation( () => String )
  unsubscribe ( @Args( 'id' ) id: number ) {
    this.service.unsubscribe( id );
    return 'Suscripción cancelada';
  }

  @Mutation( () => String )
  @Roles( 'admin' )
  pruebaNewsletter () {
    return this.service.pruebaNewsletter().mensaje;
  }
}
