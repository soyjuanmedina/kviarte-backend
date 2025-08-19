import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor ( private reflector: Reflector ) { }

  canActivate ( context: ExecutionContext ): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>( 'roles', [
      context.getHandler(),
      context.getClass(),
    ] );

    if ( !requiredRoles ) return true;

    const ctx = GqlExecutionContext.create( context );
    const user = ctx.getContext().req.user;

    if ( !user?.rol ) return false;

    // Normalizamos a mayúsculas tanto el rol del usuario como los roles requeridos
    const userRole = user.rol.toUpperCase();
    const rolesUpper = requiredRoles.map( r => r.toUpperCase() );

    return rolesUpper.includes( userRole );
  }
}
