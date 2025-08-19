// src/app.module.ts
import { Module, Logger } from '@nestjs/common';
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

const logger = new Logger( 'AppModule' );

@Module( {
  imports: [
    ConfigModule.forRoot( { isGlobal: true, envFilePath: '.env' } ),

    TypeOrmModule.forRootAsync( {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async ( config: ConfigService ) => {
        const dbUrl = config.get<string>( 'DATABASE_URL' );
        const dbSSL = config.get<string>( 'DB_SSL' ) === 'true';

        if ( !dbUrl ) {
          logger.error(
            'DATABASE_URL no definida en .env. TypeORM no se conectará.',
          );
          return {
            type: 'postgres',
            url: '',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false,
            extra: { ssl: false },
          };
        }

        logger.log(
          `DATABASE_URL encontrada, inicializando conexión TypeORM (SSL=${dbSSL})...`,
        );

        return {
          type: 'postgres',
          url: dbUrl,
          entities: [__dirname + '/**/*.entity{.ts,.js}'], // Detecta todas las entidades
          synchronize: true,
          extra: dbSSL
            ? {
              ssl: {
                rejectUnauthorized: false, // obligatorio para Supabase pooler
              },
            }
            : { ssl: false },
        };
      },
    } ),

    GraphQLModule.forRoot<ApolloDriverConfig>( {
      driver: ApolloDriver,
      autoSchemaFile: join( process.cwd(), 'src/schema.gql' ),
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
