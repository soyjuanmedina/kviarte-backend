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
exports.PromotionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const promotion_entity_1 = require("./entities/promotion.entity");
const gallery_entity_1 = require("../galleries/entities/gallery.entity");
const artwork_entity_1 = require("../artworks/entities/artwork.entity");
let PromotionsService = class PromotionsService {
    constructor(promotionsRepo, galleriesRepo, artworksRepo) {
        this.promotionsRepo = promotionsRepo;
        this.galleriesRepo = galleriesRepo;
        this.artworksRepo = artworksRepo;
    }
    async findAll() {
        return this.promotionsRepo.find({
            relations: ['gallery', 'artworks'],
        });
    }
    async findOne(id) {
        const promo = await this.promotionsRepo.findOne({
            where: { id: id },
            relations: ['gallery', 'artworks'],
        });
        if (!promo)
            throw new common_1.NotFoundException(`Promotion with id ${id} not found`);
        return promo;
    }
    async create(input) {
        const gallery = await this.galleriesRepo.findOne({
            where: { id_gallery: input.galleryId },
        });
        if (!gallery)
            throw new common_1.NotFoundException(`Gallery ${input.galleryId} not found`);
        let artworks = [];
        if (input.artworkIds?.length) {
            artworks = await this.artworksRepo.find({
                where: { id: (0, typeorm_2.In)(input.artworkIds) },
            });
        }
        const promotion = this.promotionsRepo.create({
            code: input.code,
            description: input.description,
            discount: input.discount,
            startDate: input.startDate,
            endDate: input.endDate,
            gallery,
            artworks,
        });
        return this.promotionsRepo.save(promotion);
    }
    async update(id, input) {
        const promotion = await this.findOne(id);
        if (input.galleryId) {
            const gallery = await this.galleriesRepo.findOne({ where: { id_gallery: input.galleryId } });
            if (!gallery)
                throw new common_1.NotFoundException(`Gallery ${input.galleryId} not found`);
            promotion.gallery = gallery;
        }
        if (input.artworkIds) {
            const artworks = await this.artworksRepo.find({
                where: { id: (0, typeorm_2.In)(input.artworkIds) },
            });
            promotion.artworks = artworks;
        }
        Object.assign(promotion, {
            code: input.code ?? promotion.code,
            description: input.description ?? promotion.description,
            discount: input.discount ?? promotion.discount,
            startDate: input.startDate ?? promotion.startDate,
            endDate: input.endDate ?? promotion.endDate,
        });
        return this.promotionsRepo.save(promotion);
    }
    async remove(id) {
        const result = await this.promotionsRepo.delete(id);
        return result.affected > 0;
    }
};
exports.PromotionsService = PromotionsService;
exports.PromotionsService = PromotionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(promotion_entity_1.Promotion)),
    __param(1, (0, typeorm_1.InjectRepository)(gallery_entity_1.Gallery)),
    __param(2, (0, typeorm_1.InjectRepository)(artwork_entity_1.Artwork)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PromotionsService);
//# sourceMappingURL=promotions.service.js.map