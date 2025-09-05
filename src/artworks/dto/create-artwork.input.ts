import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateArtworkInput {
  @Field()
  title: string; // antes titulo

  @Field( { nullable: true } )
  description?: string; // antes descripcion

  @Field( { nullable: true } )
  style?: string; // antes estilo

  @Field( () => Float, { nullable: true } )
  price?: number;

  @Field( { nullable: true } )
  picture?: string;

  @Field( { nullable: true } )
  available?: boolean;

  @Field( () => Int )
  artist_id: number; // antes id_artista

  @Field( () => Int )
  gallery_id: number; // antes id_gallery (ahora obligatorio en DB)

  @Field( () => Int, { nullable: true } )
  exhibition_id?: number; // antes id_exhibition
}
