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
exports.ArtistasResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const artistas_service_1 = require("./artistas.service");
const artista_entity_1 = require("./entities/artista.entity");
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let ArtistasResolver = class ArtistasResolver {
    constructor(service) {
        this.service = service;
    }
    artistas() {
        return this.service.findAll();
    }
    artista(id) {
        return this.service.findOne(id);
    }
    createArtista(nombre, id_galeria) {
        return this.service.create({ nombre, galeria: { id_galeria } });
    }
};
exports.ArtistasResolver = ArtistasResolver;
__decorate([
    (0, graphql_1.Query)(() => [artista_entity_1.Artista]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArtistasResolver.prototype, "artistas", null);
__decorate([
    (0, graphql_1.Query)(() => artista_entity_1.Artista),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArtistasResolver.prototype, "artista", null);
__decorate([
    (0, graphql_1.Mutation)(() => artista_entity_1.Artista),
    (0, roles_decorator_1.Roles)('admin', 'galeria'),
    __param(0, (0, graphql_1.Args)('nombre')),
    __param(1, (0, graphql_1.Args)('id_galeria')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], ArtistasResolver.prototype, "createArtista", null);
exports.ArtistasResolver = ArtistasResolver = __decorate([
    (0, graphql_1.Resolver)(() => artista_entity_1.Artista),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [artistas_service_1.ArtistasService])
], ArtistasResolver);
//# sourceMappingURL=artistas.resolver.js.map