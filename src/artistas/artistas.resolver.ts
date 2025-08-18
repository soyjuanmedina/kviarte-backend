import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ArtistasService } from './artistas.service';
import { Artista } from './entities/artista.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateArtistaInput } from './dto/create-artista.input';

@Resolver(() => Artista)
@UseGuards(RolesGuard)
export class ArtistasResolver {
  constructor(private service: ArtistasService) { }

  @Query(() => [Artista])
  artistas() {
    return this.service.findAll();
  }

  @Query(() => Artista)
  artista(@Args('id') id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Artista)
  @Roles('admin', 'galeria')
  createArtista(@Args('input') input: CreateArtistaInput) {
    return this.service.create(input);
  }
}

