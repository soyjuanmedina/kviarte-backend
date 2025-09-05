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
exports.GalleriesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const galleries_service_1 = require("./galleries.service");
const gallery_entity_1 = require("./entities/gallery.entity");
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const create_gallery_input_1 = require("./dto/create-gallery.input");
const update_gallery_input_1 = require("./dto/update-gallery.input");
let GalleriesResolver = class GalleriesResolver {
    constructor(service) {
        this.service = service;
    }
    galleries() {
        return this.service.findAll();
    }
    gallery(id) {
        return this.service.findOne(id);
    }
    createGallery(input) {
        return this.service.create(input);
    }
    updateGallery(id, data) {
        return this.service.update(id, data);
    }
    async deleteGallery(id) {
        return this.service.delete(id);
    }
};
exports.GalleriesResolver = GalleriesResolver;
__decorate([
    (0, graphql_1.Query)(() => [gallery_entity_1.Gallery]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GalleriesResolver.prototype, "galleries", null);
__decorate([
    (0, graphql_1.Query)(() => gallery_entity_1.Gallery),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GalleriesResolver.prototype, "gallery", null);
__decorate([
    (0, graphql_1.Mutation)(() => gallery_entity_1.Gallery),
    (0, roles_decorator_1.Roles)('ADMIN', 'GALLERY'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_gallery_input_1.CreateGalleryInput]),
    __metadata("design:returntype", void 0)
], GalleriesResolver.prototype, "createGallery", null);
__decorate([
    (0, graphql_1.Mutation)(() => gallery_entity_1.Gallery),
    (0, roles_decorator_1.Roles)('ADMIN', 'GALLERY'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_gallery_input_1.UpdateGalleryInput]),
    __metadata("design:returntype", void 0)
], GalleriesResolver.prototype, "updateGallery", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GalleriesResolver.prototype, "deleteGallery", null);
exports.GalleriesResolver = GalleriesResolver = __decorate([
    (0, graphql_1.Resolver)(() => gallery_entity_1.Gallery),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [galleries_service_1.GalleriesService])
], GalleriesResolver);
//# sourceMappingURL=galleries.resolver.js.map