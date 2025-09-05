import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { LoginResponse } from './dto/login-response.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UserRoleEnum } from '../users/user-role.enum';

@Resolver()
export class AuthResolver {
  constructor ( private authService: AuthService, private usersService: UsersService ) { }

  @Query( () => [User] )
  usersPorRol ( @Args( 'rol' ) rol: UserRoleEnum ): Promise<User[]> {
    return this.usersService.findByRole( rol );
  }


  @Mutation( () => LoginResponse )
  async login ( @Args( 'input' ) input: LoginInput ) {
    const result = await this.authService.login( input );
    console.log( 'User from service:', result.user );

    return {
      token: result.access_token,
      user: {
        id_user: result.user.id_user,  // coincide con @Field({ name: 'id_user' })
        nombre: result.user.nombre,          // coincide con @Field() nombre
        email: result.user.email,
        rol: result.user.rol,                // coincide con @Field() rol
      },
    };
  }

  @Mutation( () => String )
  async register ( @Args( 'input' ) input: RegisterInput ) {
    const user = await this.authService.register( input );
    return `User ${user.nombre} registrado correctamente`;
  }
}
