import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

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

    // Configuración de TypeORM para Supabase con async
    TypeOrmModule.forRootAsync( {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ( config: ConfigService ) => ( {
        type: 'postgres',
        url: config.get<string>( 'DATABASE_URL' ),
        ssl: { rejectUnauthorized: false }, // necesario para Supabase
        autoLoadEntities: true,
        synchronize: true,
      } ),
    } ),

    GraphQLModule.forRoot<ApolloDriverConfig>( {
      driver: ApolloDriver,
      autoSchemaFile: join( process.cwd(), 'src/schema.gql' ), // archivo opcional
      sortSchema: true,
      playground: true,
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
