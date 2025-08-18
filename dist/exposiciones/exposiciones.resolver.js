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
let ExposicionesResolver = class ExposicionesResolver {
    constructor(service) {
        this.service = service;
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
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExposicionesResolver.prototype, "exposicion", null);
__decorate([
    (0, graphql_1.Mutation)(() => exposicion_entity_1.Exposicion),
    (0, roles_decorator_1.Roles)('admin', 'galeria'),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exposicion_input_1.CreateExposicionInput]),
    __metadata("design:returntype", void 0)
], ExposicionesResolver.prototype, "createExposicion", null);
exports.ExposicionesResolver = ExposicionesResolver = __decorate([
    (0, graphql_1.Resolver)(() => exposicion_entity_1.Exposicion),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [exposiciones_service_1.ExposicionesService])
], ExposicionesResolver);
//# sourceMappingURL=exposiciones.resolver.js.map