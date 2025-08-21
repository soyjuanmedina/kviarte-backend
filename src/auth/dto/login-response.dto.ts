import { ObjectType, Field } from '@nestjs/graphql';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;

  @Field( () => Usuario )
  user: Usuario;
}
