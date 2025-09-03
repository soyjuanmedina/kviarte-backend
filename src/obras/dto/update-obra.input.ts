import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateObraInput {
  @Field( { nullable: true } )
  titulo?: string;

  @Field( { nullable: true } )
  descripcion?: string;

  @Field( { nullable: true } )
  estilo?: string;

  @Field( { nullable: true } )
  picture?: string;

  @Field( () => Int, { nullable: true } )
  id_artista?: number;

  @Field( () => Int, { nullable: true } )
  id_exposicion?: number;

  @Field( () => Int, { nullable: true } )
  id_galeria?: number;
}
