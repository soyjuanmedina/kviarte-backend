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
exports.ExhibitionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const exhibition_entity_1 = require("./entities/exhibition.entity");
const gallery_entity_1 = require("../galleries/entities/gallery.entity");
const artist_entity_1 = require("../artists/entities/artist.entity");
let ExhibitionsService = class ExhibitionsService {
    constructor(exhibitionRepo, galleryRepo, artistRepo) {
        this.exhibitionRepo = exhibitionRepo;
        this.galleryRepo = galleryRepo;
        this.artistRepo = artistRepo;
    }
    async findAll() {
        return this.exhibitionRepo.find({
            relations: ['gallery', 'artist', 'artworks'],
        });
    }
    async findOne(id) {
        return this.exhibitionRepo.findOne({
            where: { id: id },
            relations: ['gallery', 'artist', 'artworks'],
        });
    }
    async create(input) {
        const gallery = await this.galleryRepo.findOne({
            where: { id_gallery: input.gallery_id },
        });
        if (!gallery)
            throw new Error('Gallery not found');
        let artist = null;
        if (input.artist_id) {
            artist = await this.artistRepo.findOne({
                where: { id: input.artist_id },
            });
            if (!artist)
                throw new Error('Artist not found');
        }
        const exhibition = this.exhibitionRepo.create({
            title: input.title,
            description: input.description,
            picture: input.picture,
            gallery,
            artist,
        });
        return this.exhibitionRepo.save(exhibition);
    }
    async update(id, input) {
        const exhibition = await this.exhibitionRepo.findOne({
            where: { id: id },
            relations: ['gallery', 'artist', 'artworks'],
        });
        if (!exhibition)
            throw new Error('Exhibition not found');
        if (input.gallery_id) {
            const gallery = await this.galleryRepo.findOne({
                where: { id_gallery: input.gallery_id },
            });
            if (!gallery)
                throw new Error('Gallery not found');
            exhibition.gallery = gallery;
        }
        if (input.artist_id !== undefined) {
            const artist = input.artist_id
                ? await this.artistRepo.findOne({ where: { id: input.artist_id } })
                : null;
            exhibition.artist = artist;
        }
        exhibition.title = input.title ?? exhibition.title;
        exhibition.description = input.description ?? exhibition.description;
        exhibition.picture = input.picture ?? exhibition.picture;
        return this.exhibitionRepo.save(exhibition);
    }
    async delete(id) {
        const result = await this.exhibitionRepo.delete(id);
        return result.affected > 0;
    }
};
exports.ExhibitionsService = ExhibitionsService;
exports.ExhibitionsService = ExhibitionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exhibition_entity_1.Exhibition)),
    __param(1, (0, typeorm_1.InjectRepository)(gallery_entity_1.Gallery)),
    __param(2, (0, typeorm_1.InjectRepository)(artist_entity_1.Artist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ExhibitionsService);
//# sourceMappingURL=exhibitions.service.js.map