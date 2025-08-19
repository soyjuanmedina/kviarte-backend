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
exports.OfertasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const oferta_entity_1 = require("./entities/oferta.entity");
const galeria_entity_1 = require("../galerias/entities/galeria.entity");
const obra_entity_1 = require("../obras/entities/obra.entity");
let OfertasService = class OfertasService {
    constructor(repo, galeriaRepo, obraRepo) {
        this.repo = repo;
        this.galeriaRepo = galeriaRepo;
        this.obraRepo = obraRepo;
    }
    async findAll() {
        return this.repo.find({ relations: ['galeria', 'obra'] });
    }
    async findOne(id) {
        return this.repo.findOne({ where: { id_oferta: id }, relations: ['galeria', 'obra'] });
    }
    async create(input) {
        const galeria = await this.galeriaRepo.findOne({ where: { id_galeria: input.id_galeria } });
        const obra = await this.obraRepo.findOne({ where: { id_obra: input.id_obra } });
        const oferta = this.repo.create({
            precio: input.precio,
            galeria,
            obra,
        });
        return this.repo.save(oferta);
    }
};
exports.OfertasService = OfertasService;
exports.OfertasService = OfertasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(oferta_entity_1.Oferta)),
    __param(1, (0, typeorm_1.InjectRepository)(galeria_entity_1.Galeria)),
    __param(2, (0, typeorm_1.InjectRepository)(obra_entity_1.Obra)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OfertasService);
//# sourceMappingURL=ofertas.service.js.map