// src/promotions/dto/update-promotion.input.ts
import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class UpdatePromotionInput {
  @Field( () => String, { nullable: true } )
  code?: string;

  @Field( () => String, { nullable: true } )
  description?: string;

  @Field( () => Float, { nullable: true } )
  discount?: number;

  @Field( () => Date, { nullable: true } )
  startDate?: String;

  @Field( () => Date, { nullable: true } )
  endDate?: String;

  @Field( () => Int, { nullable: true } )
  galleryId?: number;

  @Field( () => [Int], { nullable: true } )
  artworkIds?: number[];
}
