// src/ofertas/dto/create-oferta.input.ts
import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateOfertaInput {
  @Field( () => Float )
  precio: number;

  @Field( () => Int )
  id_galeria: number;

  @Field( () => Int )
  id_obra: number;
}
