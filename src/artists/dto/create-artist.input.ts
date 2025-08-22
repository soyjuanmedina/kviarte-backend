// src/artistas/dto/create-artista.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateArtistInput {
  @Field()
  nombre: string;

  @Field( { nullable: true } )
  biografia?: string;

  @Field( { nullable: true } )
  estilo?: string;

  @Field( () => Int, { nullable: true } )
  id_galeria?: number;
}
