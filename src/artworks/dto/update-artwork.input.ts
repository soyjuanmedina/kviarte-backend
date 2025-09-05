import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class UpdateArtworkInput {
  @Field( { nullable: true } )
  title?: string; // antes titulo

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

  @Field( () => Int, { nullable: true } )
  artist_id?: number; // antes id_artista

  @Field( () => Int, { nullable: true } )
  gallery_id?: number; // antes id_gallery

  @Field( () => Int, { nullable: true } )
  exhibition_id?: number; // antes id_exhibition
}
