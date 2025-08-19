import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { GaleriasModule } from './galerias/galerias.module';
import { ArtistasModule } from './artistas/artistas.module';
import { ExposicionesModule } from './exposiciones/exposiciones.module';
import { ObrasModule } from './obras/obras.module';
import { OfertasModule } from './ofertas/ofertas.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module( {
  imports: [
    ConfigModule.forRoot( { isGlobal: true } ),
    TypeOrmModule.forRoot( {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    } ),
    GraphQLModule.forRoot<ApolloDriverConfig>( {
      driver: ApolloDriver,
      autoSchemaFile: true, // o una ruta './schema.gql' si prefieres archivo
      sortSchema: true,
      playground: true,     // opcional
    } ),
    AuthModule,
    UsuariosModule,
    GaleriasModule,
    ArtistasModule,
    ExposicionesModule,
    ObrasModule,
    OfertasModule,
    NewsletterModule,
  ],
} )
export class AppModule { }
