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
exports.ExhibitionsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const exhibitions_service_1 = require("./exhibitions.service");
const exhibition_entity_1 = require("./entities/exhibition.entity");
const create_exhibition_input_1 = require("./dto/create-exhibition.input");
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const gql_auth_guard_1 = require("../common/guards/gql-auth.guard");
const artwork_entity_1 = require("../artworks/entities/artwork.entity");
const artworks_service_1 = require("../artworks/artworks.service");
const update_exhibition_input_1 = require("./dto/update-exhibition.input");
let ExhibitionsResolver = class ExhibitionsResolver {
    constructor(service, artworksService) {
        this.service = service;
        this.artworksService = artworksService;
    }
    exhibitions() {
        return this.service.findAll();
    }
    exhibition(id) {
        return this.service.findOne(id);
    }
    createExhibition(data) {
        return this.service.create(data);
    }
    async deleteExhibition(id) {
        return this.service.delete(id);
    }
    updateExhibition(id, data) {
        return this.service.update(id, data);
    }
    async artworks(exhibition) {
        const { id } = exhibition;
        const artworks = await this.artworksService.findByExhibition(id);
        return artworks || [];
    }
};
exports.ExhibitionsResolver = ExhibitionsResolver;
__decorate([
    (0, graphql_1.Query)(() => [exhibition_entity_1.Exhibition]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExhibitionsResolver.prototype, "exhibitions", null);
__decorate([
    (0, graphql_1.Query)(() => exhibition_entity_1.Exhibition),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExhibitionsResolver.prototype, "exhibition", null);
__decorate([
    (0, graphql_1.Mutation)(() => exhibition_entity_1.Exhibition),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'GALLERY'),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exhibition_input_1.CreateExhibitionInput]),
    __metadata("design:returntype", void 0)
], ExhibitionsResolver.prototype, "createExhibition", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExhibitionsResolver.prototype, "deleteExhibition", null);
__decorate([
    (0, graphql_1.Mutation)(() => exhibition_entity_1.Exhibition),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'GALLERY'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_exhibition_input_1.UpdateExhibitionInput]),
    __metadata("design:returntype", void 0)
], ExhibitionsResolver.prototype, "updateExhibition", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [artwork_entity_1.Artwork], { name: 'artworks' }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exhibition_entity_1.Exhibition]),
    __metadata("design:returntype", Promise)
], ExhibitionsResolver.prototype, "artworks", null);
exports.ExhibitionsResolver = ExhibitionsResolver = __decorate([
    (0, graphql_1.Resolver)(() => exhibition_entity_1.Exhibition),
    __metadata("design:paramtypes", [exhibitions_service_1.ExhibitionsService, artworks_service_1.ArtworksService])
], ExhibitionsResolver);
//# sourceMappingURL=exhibitions.resolver.js.map