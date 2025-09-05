import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateArtistInput {
  @Field()
  name: string;   // antes nombre

  @Field( { nullable: true } )
  biography?: string;   // antes biografia

  @Field( { nullable: true } )
  style?: string;   // antes estilo

  @Field( () => Int, { nullable: true } )
  gallery_id?: number;   // antes id_gallery

  @Field( { nullable: true } )
  picture?: string;
}