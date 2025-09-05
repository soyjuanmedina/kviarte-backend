import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateGalleryInput {
  @Field()
  name: string;

  @Field( { nullable: true } )
  description?: string;

  @Field( { nullable: true } )
  address?: string;

  @Field( { nullable: true } )
  city?: string;

  @Field( { nullable: true } )
  website?: string;

  @Field( { nullable: true } )
  phone?: string;

  @Field( { nullable: true } )
  email?: string;

  @Field( () => Int )
  owner_id: number;

  @Field( { nullable: true } )
  picture?: string;
}
