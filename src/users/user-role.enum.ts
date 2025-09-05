import { registerEnumType } from '@nestjs/graphql';

export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  GALLERY = 'GALLERY',
  USER = 'USER',
  ARTIST = 'ARTIST',
}

registerEnumType( UserRoleEnum, { name: 'UserRole' } );
