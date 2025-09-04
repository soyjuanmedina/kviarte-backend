// src/app.module.ts
import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { JwtService } from '@nestjs/jwt';

import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { GaleriasModule } from './galerias/galerias.module';
import { ArtistsModule } from './artists/artists.module';
import { ExposicionesModule } from './exposiciones/exposiciones.module';
import { ObrasModule } from './obras/obras.module';
import { PromotionsModule } from './promotions/promotions.module';
import { NewsletterModule } from './newsletter/newsletter.module';

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
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          extra: dbSSL
            ? { ssl: { rejectUnauthorized: false } }
            : { ssl: false },
        };
      },
    } ),

    GraphQLModule.forRootAsync<ApolloDriverConfig>( {
      driver: ApolloDriver, // 🔹 driver obligatorio en NestJS v10
      imports: [AuthModule],
      inject: [JwtService],
      useFactory: ( jwtService: JwtService ) => ( {
        autoSchemaFile: join( process.cwd(), 'src/schema.gql' ),
        sortSchema: true,
        playground: true,
        context: ( { req } ) => {
          const authHeader = req.headers.authorization || '';
          const token = authHeader.replace( 'Bearer ', '' );
          if ( !token ) return { req };

          try {
            const user = jwtService.verify( token );
            return { req, user }; // usuario disponible en context.user
          } catch ( err ) {
            return { req };
          }
        },
      } ),
    } ),

    AuthModule,
    UsuariosModule,
    GaleriasModule,
    ArtistsModule,
    ExposicionesModule,
    ObrasModule,
    PromotionsModule,
    NewsletterModule,
  ],
} )
export class AppModule { }
