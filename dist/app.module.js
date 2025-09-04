"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
const apollo_1 = require("@nestjs/apollo");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("./auth/auth.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const galerias_module_1 = require("./galerias/galerias.module");
const artists_module_1 = require("./artists/artists.module");
const exposiciones_module_1 = require("./exposiciones/exposiciones.module");
const obras_module_1 = require("./obras/obras.module");
const promotions_module_1 = require("./promotions/promotions.module");
const newsletter_module_1 = require("./newsletter/newsletter.module");
const logger = new common_1.Logger('AppModule');
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (config) => {
                    const dbUrl = config.get('DATABASE_URL');
                    const dbSSL = config.get('DB_SSL') === 'true';
                    if (!dbUrl) {
                        logger.error('DATABASE_URL no definida en .env. TypeORM no se conectará.');
                        return {
                            type: 'postgres',
                            url: '',
                            entities: [__dirname + '/**/*.entity{.ts,.js}'],
                            synchronize: false,
                            extra: { ssl: false },
                        };
                    }
                    logger.log(`DATABASE_URL encontrada, inicializando conexión TypeORM (SSL=${dbSSL})...`);
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
            }),
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                imports: [auth_module_1.AuthModule],
                inject: [jwt_1.JwtService],
                useFactory: (jwtService) => ({
                    autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                    sortSchema: true,
                    playground: true,
                    context: ({ req }) => {
                        const authHeader = req.headers.authorization || '';
                        const token = authHeader.replace('Bearer ', '');
                        if (!token)
                            return { req };
                        try {
                            const user = jwtService.verify(token);
                            return { req, user };
                        }
                        catch (err) {
                            return { req };
                        }
                    },
                }),
            }),
            auth_module_1.AuthModule,
            usuarios_module_1.UsuariosModule,
            galerias_module_1.GaleriasModule,
            artists_module_1.ArtistsModule,
            exposiciones_module_1.ExposicionesModule,
            obras_module_1.ObrasModule,
            promotions_module_1.PromotionsModule,
            newsletter_module_1.NewsletterModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map