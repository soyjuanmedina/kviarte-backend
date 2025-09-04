import { InputType, Field, Int, Float } from '@nestjs/graphql';

//Coment
@InputType()
export class CreatePromotionInput {
  @Field( () => String )
  code: string;

  @Field( () => String, { nullable: true } )
  description?: string;

  @Field( () => Float )
  discount: number;

  @Field( () => Date )
  startDate: Date;

  @Field( () => Date )
  endDate: Date;

  @Field( () => Int )
  galleryId: number;

  // Opcional: asociar directamente a una o varias obras
  @Field( () => [Int], { nullable: true } )
  artworkIds?: number[];
}
