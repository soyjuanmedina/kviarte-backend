import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateExposicionInput {
  @Field()
  titulo: string;

  @Field({ nullable: true })
  descripcion?: string;

  @Field(() => Int)
  id_galeria: number;

  @Field(() => Int, { nullable: true })
  id_artista?: number;
}
