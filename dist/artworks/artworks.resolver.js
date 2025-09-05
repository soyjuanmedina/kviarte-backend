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
exports.ArtworksResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const artworks_service_1 = require("./artworks.service");
const artwork_entity_1 = require("./entities/artwork.entity");
const create_artwork_input_1 = require("./dto/create-artwork.input");
const update_artwork_input_1 = require("./dto/update-artwork.input");
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let ArtworksResolver = class ArtworksResolver {
    constructor(service) {
        this.service = service;
    }
    artworks() {
        return this.service.findAll();
    }
    artwork(id) {
        return this.service.findOne(id);
    }
    createArtwork(input) {
        return this.service.create(input);
    }
    updateArtwork(id, input) {
        return this.service.update(id, input);
    }
    deleteArtwork(id) {
        return this.service.delete(id);
    }
};
exports.ArtworksResolver = ArtworksResolver;
__decorate([
    (0, graphql_1.Query)(() => [artwork_entity_1.Artwork]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "artworks", null);
__decorate([
    (0, graphql_1.Query)(() => artwork_entity_1.Artwork, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "artwork", null);
__decorate([
    (0, graphql_1.Mutation)(() => artwork_entity_1.Artwork),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'GALLERY'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_artwork_input_1.CreateArtworkInput]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "createArtwork", null);
__decorate([
    (0, graphql_1.Mutation)(() => artwork_entity_1.Artwork),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'GALLERY'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_artwork_input_1.UpdateArtworkInput]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "updateArtwork", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'GALLERY'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "deleteArtwork", null);
exports.ArtworksResolver = ArtworksResolver = __decorate([
    (0, graphql_1.Resolver)(() => artwork_entity_1.Artwork),
    __metadata("design:paramtypes", [artworks_service_1.ArtworksService])
], ArtworksResolver);
//# sourceMappingURL=artworks.resolver.js.map