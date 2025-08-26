import { InputType, Field, Float } from '@nestjs/graphql';


@InputType()
export class UpdateArtistInput {
  @Field( { nullable: true } )
  nombre?: string;

  @Field( { nullable: true } )
  biografia?: string;

  @Field( { nullable: true } )
  estilo?: string;

  @Field( { nullable: true } )
  picture?: string;

  // NO ponemos id_galeria aquí, porque no es propiedad directa de Artist
}
