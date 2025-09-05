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
exports.ArtistsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const artists_service_1 = require("./artists.service");
const artist_entity_1 = require("./entities/artist.entity");
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const create_artist_input_1 = require("./dto/create-artist.input");
const update_artist_input_1 = require("./dto/update-artist.input");
const gallery_entity_1 = require("../galleries/entities/gallery.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let ArtistsResolver = class ArtistsResolver {
    constructor(service, galleryRepository) {
        this.service = service;
        this.galleryRepository = galleryRepository;
    }
    artists() {
        return this.service.findAll();
    }
    artist(id) {
        return this.service.findOne(id);
    }
    createArtist(input) {
        return this.service.create(input);
    }
    async updateArtist(id, data, gallery_id) {
        const updateData = { ...data };
        if (gallery_id !== undefined) {
            const gallery = gallery_id
                ? await this.galleryRepository.findOneBy({ id_gallery: gallery_id })
                : null;
            updateData.gallery = gallery;
        }
        return this.service.update(id, updateData);
    }
    async deleteArtist(id) {
        return this.service.delete(id);
    }
};
exports.ArtistsResolver = ArtistsResolver;
__decorate([
    (0, graphql_1.Query)(() => [artist_entity_1.Artist]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArtistsResolver.prototype, "artists", null);
__decorate([
    (0, graphql_1.Query)(() => artist_entity_1.Artist),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArtistsResolver.prototype, "artist", null);
__decorate([
    (0, graphql_1.Mutation)(() => artist_entity_1.Artist),
    (0, roles_decorator_1.Roles)('ADMIN', 'GALLERY', 'ARTIST'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_artist_input_1.CreateArtistInput]),
    __metadata("design:returntype", void 0)
], ArtistsResolver.prototype, "createArtist", null);
__decorate([
    (0, graphql_1.Mutation)(() => artist_entity_1.Artist),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('data')),
    __param(2, (0, graphql_1.Args)('gallery_id', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_artist_input_1.UpdateArtistInput, Number]),
    __metadata("design:returntype", Promise)
], ArtistsResolver.prototype, "updateArtist", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArtistsResolver.prototype, "deleteArtist", null);
exports.ArtistsResolver = ArtistsResolver = __decorate([
    (0, graphql_1.Resolver)(() => artist_entity_1.Artist),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(1, (0, typeorm_2.InjectRepository)(gallery_entity_1.Gallery)),
    __metadata("design:paramtypes", [artists_service_1.ArtistsService,
        typeorm_1.Repository])
], ArtistsResolver);
//# sourceMappingURL=artists.resolver.js.map