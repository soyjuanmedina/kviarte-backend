import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateObraInput {
  @Field()
  titulo: string;

  @Field( { nullable: true } )
  descripcion?: string;

  @Field( { nullable: true } )
  estilo?: string;

  @Field( () => Int )
  id_artista: number;

  @Field( () => Int, { nullable: true } )
  id_exposicion?: number;

  @Field( { nullable: true } )
  picture?: string;
}
