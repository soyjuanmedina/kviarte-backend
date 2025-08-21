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
    // Esto ya debería devolver algo como { access_token, user }
    const result = await this.authService.login( input );
    console.log( 'User from service:', result.user );
    return {
      token: result.access_token,
      user: {
        id: result.user.id_usuario,   // mapeo id_usuario -> id
        email: result.user.email,
        name: result.user.nombre,     // mapeo nombre -> name
        role: result.user.rol,        // mapeo rol -> role
      },
    };
  }

  @Mutation( () => String )
  async register ( @Args( 'input' ) input: RegisterInput ) {
    const user = await this.authService.register( input );
    return `Usuario ${user.nombre} registrado correctamente`;
  }
}
