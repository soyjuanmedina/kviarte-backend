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
const auth_module_1 = require("./auth/auth.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const galerias_module_1 = require("./galerias/galerias.module");
const artistas_module_1 = require("./artistas/artistas.module");
const exposiciones_module_1 = require("./exposiciones/exposiciones.module");
const obras_module_1 = require("./obras/obras.module");
const ofertas_module_1 = require("./ofertas/ofertas.module");
const newsletter_module_1 = require("./newsletter/newsletter.module");
const apollo_1 = require("@nestjs/apollo");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    url: config.get('DATABASE_URL'),
                    ssl: { rejectUnauthorized: false },
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                sortSchema: true,
                playground: true,
            }),
            auth_module_1.AuthModule,
            usuarios_module_1.UsuariosModule,
            galerias_module_1.GaleriasModule,
            artistas_module_1.ArtistasModule,
            exposiciones_module_1.ExposicionesModule,
            obras_module_1.ObrasModule,
            ofertas_module_1.OfertasModule,
            newsletter_module_1.NewsletterModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map