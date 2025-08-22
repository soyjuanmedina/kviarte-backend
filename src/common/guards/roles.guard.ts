import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor ( private reflector: Reflector ) { }

  canActivate ( context: ExecutionContext ): boolean {
    // Roles requeridos del decorador @Roles
    const requiredRoles = this.reflector.getAllAndOverride<string[]>( 'roles', [
      context.getHandler(),
      context.getClass(),
    ] );

    if ( !requiredRoles ) return true;

    // Contexto GraphQL
    const ctxGql = GqlExecutionContext.create( context );
    const ctx = ctxGql.getContext();

    // Tomamos el usuario de GraphQL o REST
    const user = ctx.user || ctx.req?.user;

    if ( !user?.rol ) return false;

    const userRole = user.rol.toUpperCase();
    const rolesUpper = requiredRoles.map( r => r.toUpperCase() );

    console.log( 'User object:', user );
    console.log( 'User role (upper):', userRole );
    console.log( 'Required roles (upper):', rolesUpper );

    return rolesUpper.includes( userRole );
  }
}
