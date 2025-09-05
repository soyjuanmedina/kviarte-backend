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
exports.ArtistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const artist_entity_1 = require("./entities/artist.entity");
const gallery_entity_1 = require("../galleries/entities/gallery.entity");
let ArtistsService = class ArtistsService {
    constructor(artistRepo, galleryRepository) {
        this.artistRepo = artistRepo;
        this.galleryRepository = galleryRepository;
    }
    async findAll() {
        return this.artistRepo.find({
            relations: ['gallery', 'artworks', 'exhibitions'],
        });
    }
    async findOne(id) {
        return this.artistRepo.findOne({
            where: { id },
            relations: ['gallery', 'artworks', 'exhibitions'],
        });
    }
    async create(createArtistInput) {
        const { gallery_id, ...rest } = createArtistInput;
        const artist = this.artistRepo.create(rest);
        if (gallery_id) {
            const gallery = await this.galleryRepository.findOneBy({ id_gallery: gallery_id });
            artist.gallery = gallery;
        }
        return this.artistRepo.save(artist);
    }
    async update(id, data) {
        const artist = await this.artistRepo.findOne({
            where: { id },
            relations: ['gallery'],
        });
        if (!artist)
            throw new common_1.NotFoundException(`Artist with id ${id} not found`);
        Object.assign(artist, data);
        return this.artistRepo.save(artist);
    }
    async delete(id) {
        const result = await this.artistRepo.delete(id);
        return result.affected > 0;
    }
};
exports.ArtistsService = ArtistsService;
exports.ArtistsService = ArtistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(artist_entity_1.Artist)),
    __param(1, (0, typeorm_1.InjectRepository)(gallery_entity_1.Gallery)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ArtistsService);
//# sourceMappingURL=artists.service.js.map