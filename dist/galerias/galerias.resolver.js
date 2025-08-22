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
exports.GaleriasResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const galerias_service_1 = require("./galerias.service");
const galeria_entity_1 = require("./entities/galeria.entity");
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let GaleriasResolver = class GaleriasResolver {
    constructor(service) {
        this.service = service;
    }
    galerias() {
        return this.service.findAll();
    }
    galeria(id) {
        return this.service.findOne(id);
    }
    createGaleria(usuarioId, nombre, descripcion, direccion, ciudad, web, email_contacto, telefono, email) {
        return this.service.create({
            nombre,
            descripcion,
            direccion,
            ciudad,
            web,
            email_contacto,
            telefono,
            email,
            usuario_id: usuarioId,
        });
    }
};
exports.GaleriasResolver = GaleriasResolver;
__decorate([
    (0, graphql_1.Query)(() => [galeria_entity_1.Galeria]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GaleriasResolver.prototype, "galerias", null);
__decorate([
    (0, graphql_1.Query)(() => galeria_entity_1.Galeria),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GaleriasResolver.prototype, "galeria", null);
__decorate([
    (0, graphql_1.Mutation)(() => galeria_entity_1.Galeria),
    (0, roles_decorator_1.Roles)('ADMIN', 'GALLERY'),
    __param(0, (0, graphql_1.Args)('usuarioId')),
    __param(1, (0, graphql_1.Args)('nombre')),
    __param(2, (0, graphql_1.Args)('descripcion', { nullable: true })),
    __param(3, (0, graphql_1.Args)('direccion', { nullable: true })),
    __param(4, (0, graphql_1.Args)('ciudad', { nullable: true })),
    __param(5, (0, graphql_1.Args)('web', { nullable: true })),
    __param(6, (0, graphql_1.Args)('email_contacto', { nullable: true })),
    __param(7, (0, graphql_1.Args)('telefono', { nullable: true })),
    __param(8, (0, graphql_1.Args)('email', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], GaleriasResolver.prototype, "createGaleria", null);
exports.GaleriasResolver = GaleriasResolver = __decorate([
    (0, graphql_1.Resolver)(() => galeria_entity_1.Galeria),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [galerias_service_1.GaleriasService])
], GaleriasResolver);
//# sourceMappingURL=galerias.resolver.js.map