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
exports.ArtistasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const artista_entity_1 = require("./entities/artista.entity");
const galeria_entity_1 = require("../galerias/entities/galeria.entity");
let ArtistasService = class ArtistasService {
    constructor(repo, galeriaRepo) {
        this.repo = repo;
        this.galeriaRepo = galeriaRepo;
    }
    async findAll() {
        return this.repo.find({ relations: ['galeria', 'obras', 'exposiciones'] });
    }
    async findOne(id) {
        return this.repo.findOne({
            where: { id_artista: id },
            relations: ['galeria', 'obras', 'exposiciones'],
        });
    }
    async create(input) {
        const galeria = await this.galeriaRepo.findOne({
            where: { id_galeria: input.id_galeria },
        });
        if (!galeria) {
            throw new Error('Galería no encontrada');
        }
        const artista = this.repo.create({
            nombre: input.nombre,
            biografia: input.biografia,
            estilo: input.estilo,
            galeria,
        });
        return this.repo.save(artista);
    }
};
exports.ArtistasService = ArtistasService;
exports.ArtistasService = ArtistasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(artista_entity_1.Artista)),
    __param(1, (0, typeorm_1.InjectRepository)(galeria_entity_1.Galeria)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ArtistasService);
//# sourceMappingURL=artistas.service.js.map