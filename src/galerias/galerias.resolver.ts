import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GaleriasService } from './galerias.service';
import { Galeria } from './entities/galeria.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Resolver(() => Galeria)
@UseGuards(RolesGuard)
export class GaleriasResolver {
  constructor(private readonly service: GaleriasService) { }

  @Query(() => [Galeria])
  galerias() {
    return this.service.findAll();
  }

  @Query(() => Galeria)
  galeria(@Args('id') id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Galeria)
  @Roles('admin', 'galeria')
  createGaleria(
    @Args('nombre') nombre: string,
    @Args('email') email: string,
    @Args('telefono') telefono: string
  ) {
    return this.service.create({ nombre, email, telefono });
  }
}
