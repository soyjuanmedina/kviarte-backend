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
const galeria_entity_1 = require("../galerias/entities/galeria.entity");
const obra_entity_1 = require("../obras/entities/obra.entity");
let PromotionsService = class PromotionsService {
    constructor(promotionsRepo, galeriasRepo, obrasRepo) {
        this.promotionsRepo = promotionsRepo;
        this.galeriasRepo = galeriasRepo;
        this.obrasRepo = obrasRepo;
    }
    async findAll() {
        return this.promotionsRepo.find({
            relations: ['galeria', 'artworks'],
        });
    }
    async findOne(id) {
        const promo = await this.promotionsRepo.findOne({
            where: { id: id },
            relations: ['galeria', 'artworks'],
        });
        if (!promo)
            throw new common_1.NotFoundException(`Promotion with id ${id} not found`);
        return promo;
    }
    async create(input) {
        const galeria = await this.galeriasRepo.findOne({
            where: { id_galeria: input.galleryId },
        });
        if (!galeria)
            throw new common_1.NotFoundException(`Gallery ${input.galleryId} not found`);
        let artworks = [];
        if (input.artworkIds?.length) {
            artworks = await this.obrasRepo.find({
                where: { id_obra: (0, typeorm_2.In)(input.artworkIds) },
            });
        }
        const promotion = this.promotionsRepo.create({
            code: input.code,
            description: input.description,
            discount: input.discount,
            startDate: input.startDate,
            endDate: input.endDate,
            galeria,
            artworks,
        });
        return this.promotionsRepo.save(promotion);
    }
    async update(id, input) {
        const promotion = await this.findOne(id);
        if (input.galleryId) {
            const galeria = await this.galeriasRepo.findOne({ where: { id_galeria: input.galleryId } });
            if (!galeria)
                throw new common_1.NotFoundException(`Gallery ${input.galleryId} not found`);
            promotion.galeria = galeria;
        }
        if (input.artworkIds) {
            const artworks = await this.obrasRepo.find({
                where: { id_obra: (0, typeorm_2.In)(input.artworkIds) },
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
    __param(1, (0, typeorm_1.InjectRepository)(galeria_entity_1.Galeria)),
    __param(2, (0, typeorm_1.InjectRepository)(obra_entity_1.Obra)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PromotionsService);
//# sourceMappingURL=promotions.service.js.map