import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor ( private reflector: Reflector ) { }

  canActivate ( context: ExecutionContext ): boolean {
    // Obtenemos los roles requeridos del decorador @Roles
    const requiredRoles = this.reflector.getAllAndOverride<string[]>( 'roles', [
      context.getHandler(),
      context.getClass(),
    ] );

    // Si no hay roles requeridos, permitimos el acceso
    if ( !requiredRoles ) return true;

    // Creamos el contexto de GraphQL
    const ctx = GqlExecutionContext.create( context );
    const user = ctx.getContext().req.user;

    // Si no hay usuario o no tiene rol, denegamos
    if ( !user?.rol ) return false;

    // Normalizamos a mayúsculas tanto el rol del usuario como los roles requeridos
    const userRole = user.rol.toUpperCase();
    console.log( 'User role desde req.user en RolesGuard:', userRole );
    const rolesUpper = requiredRoles.map( r => r.toUpperCase() );

    // Logs para depurar
    console.log( 'User object:', user );
    console.log( 'User role (upper):', userRole );
    console.log( 'Required roles (upper):', rolesUpper );

    // Comprobamos si el rol del usuario está entre los roles requeridos
    return rolesUpper.includes( userRole );
  }
}
