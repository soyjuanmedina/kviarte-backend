import { InputType, Field, Float, Int } from '@nestjs/graphql';


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

  @Field( () => Int, { nullable: true } )
  id_galeria?: number;
}
