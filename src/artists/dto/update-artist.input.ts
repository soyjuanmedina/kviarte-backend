import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateArtistInput {
  @Field( { nullable: true } )
  name?: string;   // antes nombre

  @Field( { nullable: true } )
  biography?: string;   // antes biografia

  @Field( { nullable: true } )
  style?: string;   // antes estilo

  @Field( { nullable: true } )
  picture?: string;

  @Field( () => Int, { nullable: true } )
  gallery_id?: number;   // antes id_gallery
}
