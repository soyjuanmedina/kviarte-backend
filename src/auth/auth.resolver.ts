import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';

@Resolver()
export class AuthResolver {
  constructor ( private authService: AuthService ) { }

  @Mutation( () => String )
  async login ( @Args( 'input' ) input: LoginInput ) {
    const result = await this.authService.login( input );
    return result.access_token;
  }

  @Mutation( () => String )
  async register ( @Args( 'input' ) input: RegisterInput ) {
    const user = await this.authService.register( input );
    return `Usuario ${user.nombre} registrado correctamente`;
  }
}
