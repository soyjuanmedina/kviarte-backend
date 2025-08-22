import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { Artist } from './entities/artist.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateArtistInput } from './dto/create-artist.input';

@Resolver( () => Artist )
@UseGuards( RolesGuard )
export class ArtistasResolver {
  constructor ( private service: ArtistsService ) { }

  @Query( () => [Artist] )
  artistas () {
    return this.service.findAll();
  }

  @Query( () => Artist )
  artista ( @Args( 'id' ) id: number ) {
    return this.service.findOne( id );
  }

  @Mutation( () => Artist )
  @Roles( 'ADMIN', 'GALLERY', 'ARTIST' )
  createArtist ( @Args( 'input' ) input: CreateArtistInput ) {
    return this.service.create( input );
  }
}

