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

    return {
      token: result.access_token,
      user: result.user, // Asegúrate de que tu service devuelva el objeto usuario
    };
  }

  @Mutation( () => String )
  async register ( @Args( 'input' ) input: RegisterInput ) {
    const user = await this.authService.register( input );
    return `Usuario ${user.nombre} registrado correctamente`;
  }
}
