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
exports.ObrasResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const obras_service_1 = require("./obras.service");
const obra_entity_1 = require("./entities/obra.entity");
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let ObrasResolver = class ObrasResolver {
    constructor(service) {
        this.service = service;
    }
    obras() {
        return this.service.findAll();
    }
    obra(id) {
        return this.service.findOne(id);
    }
    createObra(titulo, id_artista, id_exposicion) {
        return this.service.create({ titulo, artista: { id_artista }, exposicion: id_exposicion ? { id_exposicion } : null });
    }
};
exports.ObrasResolver = ObrasResolver;
__decorate([
    (0, graphql_1.Query)(() => [obra_entity_1.Obra]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ObrasResolver.prototype, "obras", null);
__decorate([
    (0, graphql_1.Query)(() => obra_entity_1.Obra),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ObrasResolver.prototype, "obra", null);
__decorate([
    (0, graphql_1.Mutation)(() => obra_entity_1.Obra),
    (0, roles_decorator_1.Roles)('admin', 'galeria'),
    __param(0, (0, graphql_1.Args)('titulo')),
    __param(1, (0, graphql_1.Args)('id_artista')),
    __param(2, (0, graphql_1.Args)('id_exposicion', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], ObrasResolver.prototype, "createObra", null);
exports.ObrasResolver = ObrasResolver = __decorate([
    (0, graphql_1.Resolver)(() => obra_entity_1.Obra),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [obras_service_1.ObrasService])
], ObrasResolver);
//# sourceMappingURL=obras.resolver.js.map