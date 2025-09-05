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
exports.GalleriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const gallery_entity_1 = require("./entities/gallery.entity");
let GalleriesService = class GalleriesService {
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({
            relations: ['owner', 'exhibitions', 'artists', 'artworks', 'promotions'],
        });
    }
    async findOne(id) {
        return this.repo.findOne({
            where: { id_gallery: id },
            relations: ['owner', 'exhibitions', 'artists', 'artworks', 'promotions'],
        });
    }
    async create(input) {
        const gallery = this.repo.create(input);
        if (input.owner_id) {
            gallery.owner = { id: input.owner_id };
            delete gallery.owner_id;
        }
        const saved = await this.repo.save(gallery);
        return this.findOne(saved.id_gallery);
    }
    async update(id, data) {
        const gallery = await this.repo.findOne({ where: { id_gallery: id } });
        if (!gallery)
            throw new common_1.NotFoundException(`Gallery with id ${id} not found`);
        Object.assign(gallery, data);
        if ('owner_id' in data) {
            gallery.owner = data.owner_id ? { id: data.owner_id } : null;
            delete gallery.owner_id;
        }
        await this.repo.save(gallery);
        return this.findOne(id);
    }
    async delete(id) {
        const result = await this.repo.delete(id);
        return result.affected > 0;
    }
};
exports.GalleriesService = GalleriesService;
exports.GalleriesService = GalleriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(gallery_entity_1.Gallery)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GalleriesService);
//# sourceMappingURL=galleries.service.js.map