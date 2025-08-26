// src/galerias/dto/update-gallery.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateGalleryInput {
  @Field( { nullable: true } )
  nombre?: string;

  @Field( { nullable: true } )
  descripcion?: string;

  @Field( { nullable: true } )
  direccion?: string;

  @Field( { nullable: true } )
  ciudad?: string;

  @Field( { nullable: true } )
  web?: string;

  @Field( { nullable: true } )
  telefono?: string;

  @Field( { nullable: true } )
  email?: string;

  @Field( () => Int, { nullable: true } )
  usuario_id?: number;

  @Field( { nullable: true } )
  picture?: string; // <-- nuevo campo
}