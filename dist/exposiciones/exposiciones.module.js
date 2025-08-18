"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExposicionesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exposiciones_service_1 = require("./exposiciones.service");
const exposiciones_resolver_1 = require("./exposiciones.resolver");
const exposicion_entity_1 = require("./entities/exposicion.entity");
const galeria_entity_1 = require("../galerias/entities/galeria.entity");
const artista_entity_1 = require("../artistas/entities/artista.entity");
let ExposicionesModule = class ExposicionesModule {
};
exports.ExposicionesModule = ExposicionesModule;
exports.ExposicionesModule = ExposicionesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([exposicion_entity_1.Exposicion, galeria_entity_1.Galeria, artista_entity_1.Artista])],
        providers: [exposiciones_service_1.ExposicionesService, exposiciones_resolver_1.ExposicionesResolver],
    })
], ExposicionesModule);
//# sourceMappingURL=exposiciones.module.js.map