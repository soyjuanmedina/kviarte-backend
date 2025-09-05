import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateExhibitionInput {
  @Field()
  title: string; // antes 'titulo'

  @Field( { nullable: true } )
  description?: string; // antes 'descripcion'

  @Field( () => Int )
  gallery_id: number; // antes 'id_gallery'

  @Field( () => Int, { nullable: true } )
  artist_id?: number; // antes 'id_artista'

  @Field( { nullable: true } )
  picture?: string;
}
