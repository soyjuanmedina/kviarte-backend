"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExposicionesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const exposiciones_service_1 = require("./exposiciones.service");
const exposicion_entity_1 = require("./entities/exposicion.entity");
const create_exposicion_input_1 = require("./dto/create-exposicion.input");
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const gql_auth_guard_1 = require("../common/guards/gql-auth.guard");
const obra_entity_1 = require("../obras/entities/obra.entity");
const obras_service_1 = require("../obras/obras.service");
let ExposicionesResolver = class ExposicionesResolver {
    constructor(service, obrasService) {
        this.service = service;
        this.obrasService = obrasService;
    }
    exposiciones() {
        return this.service.findAll();
    }
    exposicion(id) {
        return this.service.findOne(id);
    }
    createExposicion(data) {
        return this.service.create(data);
    }
    async deleteExhibition(id) {
        return this.service.delete(id);
    }
    updateExposicion(id, data) {
        return this.service.update(id, data);
    }
    async obras(exposicion) {
        const { id_exposicion } = exposicion;
        const obras = await this.obrasService.findByExposicion(id_exposicion);
        return obras || [];
    }
};
exports.ExposicionesResolver = ExposicionesResolver;
__decorate([
    (0, graphql_1.Query)(() => [exposicion_entity_1.Exposicion]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExposicionesResolver.prototype, "exposiciones", null);
__decorate([
    (0, graphql_1.Query)(() => exposicion_entity_1.Exposicion),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExposicionesResolver.prototype, "exposicion", null);
__decorate([
    (0, graphql_1.Mutation)(() => exposicion_entity_1.Exposicion),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'GALLERY'),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exposicion_input_1.CreateExposicionInput]),
    __metadata("design:returntype", void 0)
], ExposicionesResolver.prototype, "createExposicion", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExposicionesResolver.prototype, "deleteExhibition", null);
__decorate([
    (0, graphql_1.Mutation)(() => exposicion_entity_1.Exposicion),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'GALLERY'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_exposicion_input_1.CreateExposicionInput]),
    __metadata("design:returntype", void 0)
], ExposicionesResolver.prototype, "updateExposicion", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [obra_entity_1.Obra], { name: 'obras' }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exposicion_entity_1.Exposicion]),
    __metadata("design:returntype", Promise)
], ExposicionesResolver.prototype, "obras", null);
exports.ExposicionesResolver = ExposicionesResolver = __decorate([
    (0, graphql_1.Resolver)(() => exposicion_entity_1.Exposicion),
    __metadata("design:paramtypes", [exposiciones_service_1.ExposicionesService, obras_service_1.ObrasService])
], ExposicionesResolver);
//# sourceMappingURL=exposiciones.resolver.js.map