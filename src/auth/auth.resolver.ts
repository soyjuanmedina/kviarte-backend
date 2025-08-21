import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { LoginResponse } from './dto/login-response.dto';

@Resolver()
export class AuthResolver {
  constructor ( private authService: AuthService ) { }

  @Mutation( () => LoginResponse )
  async login ( @Args( 'input' ) input: LoginInput ) {
    const result = await this.authService.login( input );
    console.log( 'User from service:', result.user );

    return {
      token: result.access_token,
      user: {
        id_usuario: result.user.id_usuario,  // coincide con @Field({ name: 'id_usuario' })
        nombre: result.user.nombre,          // coincide con @Field() nombre
        email: result.user.email,
        rol: result.user.rol,                // coincide con @Field() rol
      },
    };
  }


  @Mutation( () => String )
  async register ( @Args( 'input' ) input: RegisterInput ) {
    const user = await this.authService.register( input );
    return `Usuario ${user.nombre} registrado correctamente`;
  }
}
