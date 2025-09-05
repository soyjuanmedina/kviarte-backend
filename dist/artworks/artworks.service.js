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
exports.ArtworksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const artwork_entity_1 = require("./entities/artwork.entity");
const artist_entity_1 = require("../artists/entities/artist.entity");
const exhibition_entity_1 = require("../exhibitions/entities/exhibition.entity");
const gallery_entity_1 = require("../galleries/entities/gallery.entity");
let ArtworksService = class ArtworksService {
    constructor(artworkRepo, artistRepo, exhibitionRepo, galleryRepo) {
        this.artworkRepo = artworkRepo;
        this.artistRepo = artistRepo;
        this.exhibitionRepo = exhibitionRepo;
        this.galleryRepo = galleryRepo;
    }
    async findAll() {
        return this.artworkRepo.find({ relations: ['artist', 'gallery', 'exhibition', 'promotions'] });
    }
    async findOne(id) {
        return this.artworkRepo.findOne({
            where: { id: id },
            relations: ['artist', 'gallery', 'exhibition', 'promotions', 'exhibition.gallery'],
        });
    }
    async create(input) {
        const artist = await this.artistRepo.findOne({ where: { id: input.artist_id } });
        if (!artist)
            throw new common_1.NotFoundException(`Artist with id ${input.artist_id} not found`);
        const exhibition = input.exhibition_id
            ? await this.exhibitionRepo.findOne({ where: { id: input.exhibition_id } })
            : null;
        const gallery = input.gallery_id
            ? await this.galleryRepo.findOne({ where: { id: input.gallery_id } })
            : null;
        const artwork = this.artworkRepo.create({
            title: input.title,
            description: input.description,
            style: input.style,
            price: input.price,
            picture: input.picture,
            available: input.available ?? true,
            artist,
            exhibition,
            gallery,
        });
        return this.artworkRepo.save(artwork);
    }
    async update(id, input) {
        const artwork = await this.artworkRepo.findOne({ where: { id } });
        if (!artwork)
            throw new common_1.NotFoundException(`Artwork with id ${id} not found`);
        if (input.artist_id) {
            artwork.artist = await this.artistRepo.findOne({ where: { id: input.artist_id } });
        }
        if (input.exhibition_id !== undefined) {
            artwork.exhibition = input.exhibition_id
                ? await this.exhibitionRepo.findOne({ where: { id: input.exhibition_id } })
                : null;
        }
        if (input.gallery_id !== undefined) {
            artwork.gallery = input.gallery_id
                ? await this.galleryRepo.findOne({ where: { id: input.gallery_id } })
                : null;
        }
        if (input.title !== undefined)
            artwork.title = input.title;
        if (input.description !== undefined)
            artwork.description = input.description;
        if (input.style !== undefined)
            artwork.style = input.style;
        if (input.picture !== undefined)
            artwork.picture = input.picture;
        if (input.price !== undefined)
            artwork.price = input.price;
        if (input.available !== undefined)
            artwork.available = input.available;
        return this.artworkRepo.save(artwork);
    }
    async delete(id) {
        const artwork = await this.artworkRepo.findOne({ where: { id } });
        if (!artwork)
            throw new common_1.NotFoundException(`Artwork with id ${id} not found`);
        await this.artworkRepo.remove(artwork);
        return true;
    }
    async findByExhibition(exhibition_id) {
        return this.artworkRepo.find({
            where: { exhibition: { id: exhibition_id } },
            relations: ['artist', 'gallery', 'exhibition', 'promotions'],
        });
    }
};
exports.ArtworksService = ArtworksService;
exports.ArtworksService = ArtworksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(artwork_entity_1.Artwork)),
    __param(1, (0, typeorm_1.InjectRepository)(artist_entity_1.Artist)),
    __param(2, (0, typeorm_1.InjectRepository)(exhibition_entity_1.Exhibition)),
    __param(3, (0, typeorm_1.InjectRepository)(gallery_entity_1.Gallery)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ArtworksService);
//# sourceMappingURL=artworks.service.js.map