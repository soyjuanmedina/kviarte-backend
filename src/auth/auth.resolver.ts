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
  usersByRole ( @Args( 'role' ) role: UserRoleEnum ): Promise<User[]> {
    return this.usersService.findByRole( role );
  }


  @Mutation( () => LoginResponse )
  async login ( @Args( 'input' ) input: LoginInput ) {
    const result = await this.authService.login( input );
    console.log( 'User from service:', result.user );

    return {
      token: result.token,
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        registrationDate: result.user.registrationDate,
      },
    };
  }

  @Mutation( () => String )
  async register ( @Args( 'input' ) input: RegisterInput ) {
    const user = await this.authService.register( input );
    return `User ${user.name} registrado correctamente`;
  }
}
