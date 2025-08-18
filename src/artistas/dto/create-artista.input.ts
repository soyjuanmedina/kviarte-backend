// src/artistas/dto/create-artista.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateArtistaInput {
  @Field()
  nombre: string;

  @Field(() => Int)
  id_galeria: number;

  @Field({ nullable: true })
  biografia?: string;

  @Field({ nullable: true })
  estilo?: string;
}
