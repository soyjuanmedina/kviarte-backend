import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard( 'jwt' ) {
  getRequest ( context: ExecutionContext ) {
    const ctx = GqlExecutionContext.create( context );
    const req = ctx.getContext().req;
    console.log( 'req.headers:', req.headers );
    console.log( 'req.user:', req.user );
    return req;
  }
}
