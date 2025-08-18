import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ObrasService } from './obras.service';
import { Obra } from './entities/obra.entity';
import { CreateObraInput } from './dto/create-obra.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Resolver(() => Obra)
@UseGuards(RolesGuard)
export class ObrasResolver {
  constructor(private readonly service: ObrasService) { }

  @Query(() => [Obra])
  obras() {
    return this.service.findAll();
  }

  @Query(() => Obra)
  obra(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Obra)
  @Roles('admin', 'galeria')
  createObra(@Args('input') input: CreateObraInput) {
    return this.service.create({
      titulo: input.titulo,
      descripcion: input.descripcion,
      estilo: input.estilo,
      artista: { id_artista: input.id_artista },
      exposicion: input.id_exposicion ? { id_exposicion: input.id_exposicion } : null,
    });
  }
}
