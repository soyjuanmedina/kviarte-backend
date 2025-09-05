import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateExhibitionInput {
  @Field( { nullable: true } )
  title?: string; // antes 'titulo'

  @Field( { nullable: true } )
  description?: string; // antes 'descripcion'

  @Field( () => Int, { nullable: true } )
  gallery_id?: number; // antes 'id_gallery'

  @Field( () => Int, { nullable: true } )
  artist_id?: number; // antes 'id_artista'

  @Field( { nullable: true } )
  picture?: string;
}
