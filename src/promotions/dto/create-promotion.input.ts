// src/promotions/dto/create-promotion.input.ts
import { InputType, Field, Int, Float } from '@nestjs/graphql';

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

  // Opcional: asociar directamente a una o varias artworks
  @Field( () => [Int], { nullable: true } )
  artworkIds?: number[];
}
