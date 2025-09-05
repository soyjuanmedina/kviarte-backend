import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver( () => User )
@UseGuards( RolesGuard )
export class UsersResolver {
  constructor ( private service: UsersService ) { }

  @Query( () => [User] )
  @Roles( 'ADMIN' )
  users () {
    return this.service.findAll();
  }

  @Query( () => User )
  @Roles( 'ADMIN' )
  user ( @Args( 'id', { type: () => Int } ) id: number ) {
    return this.service.findOne( id );
  }

  @Mutation( () => Boolean )
  @Roles( 'ADMIN' )
  async deleteUser ( @Args( 'id', { type: () => Int } ) id: number ): Promise<boolean> {
    return this.service.delete( id );
  }

  @Mutation( () => User )
  @Roles( 'ADMIN' )
  createUser ( @Args( 'input' ) input: CreateUserInput ) {
    return this.service.create( input );
  }

  @Mutation( () => User )
  @Roles( 'ADMIN' )
  updateUser ( @Args( 'id', { type: () => Int } ) id: number, @Args( 'input' ) input: UpdateUserInput ) {
    return this.service.update( id, input );
  }
}
