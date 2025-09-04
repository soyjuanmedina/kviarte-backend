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
exports.ExposicionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const exposicion_entity_1 = require("./entities/exposicion.entity");
const galeria_entity_1 = require("../galerias/entities/galeria.entity");
const artist_entity_1 = require("../artists/entities/artist.entity");
let ExposicionesService = class ExposicionesService {
    constructor(exposicionRepo, galeriaRepo, artistRepo) {
        this.exposicionRepo = exposicionRepo;
        this.galeriaRepo = galeriaRepo;
        this.artistRepo = artistRepo;
    }
    async findAll() {
        return this.exposicionRepo.find({
            relations: ['galeria', 'artist', 'obras'],
        });
    }
    async findOne(id) {
        return this.exposicionRepo.findOne({
            where: { id_exposicion: id },
            relations: ['galeria', 'artist', 'obras'],
        });
    }
    async create(input) {
        console.log('input.id_galeria:', input.id_galeria, typeof input.id_galeria);
        const galeria = await this.galeriaRepo.findOne({
            where: { id_galeria: input.id_galeria },
        });
        if (!galeria)
            throw new Error('Galería no encontrada');
        let artist = null;
        if (input.id_artista) {
            artist = await this.artistRepo.findOne({
                where: { id_artista: input.id_artista },
            });
            if (!artist)
                throw new Error('Artista no encontrado');
        }
        const exposicion = this.exposicionRepo.create({
            titulo: input.titulo,
            descripcion: input.descripcion,
            galeria,
            artist,
        });
        return this.exposicionRepo.save(exposicion);
    }
    async delete(id) {
        const result = await this.exposicionRepo.delete(id);
        return result.affected > 0;
    }
    async update(id, input) {
        const exposicion = await this.exposicionRepo.findOne({
            where: { id_exposicion: id },
            relations: ['galeria', 'artist', 'obras'],
        });
        if (!exposicion)
            throw new Error('Exposición no encontrada');
        if (input.id_galeria) {
            const galeria = await this.galeriaRepo.findOne({
                where: { id_galeria: input.id_galeria },
            });
            if (!galeria)
                throw new Error('Galería no encontrada');
            exposicion.galeria = galeria;
        }
        if (input.id_artista) {
            const artist = await this.artistRepo.findOne({
                where: { id_artista: input.id_artista },
            });
            if (!artist)
                throw new Error('Artista no encontrado');
            exposicion.artist = artist;
        }
        exposicion.titulo = input.titulo ?? exposicion.titulo;
        exposicion.descripcion = input.descripcion ?? exposicion.descripcion;
        exposicion.picture = input.picture ?? exposicion.picture;
        return this.exposicionRepo.save(exposicion);
    }
};
exports.ExposicionesService = ExposicionesService;
exports.ExposicionesService = ExposicionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exposicion_entity_1.Exposicion)),
    __param(1, (0, typeorm_1.InjectRepository)(galeria_entity_1.Galeria)),
    __param(2, (0, typeorm_1.InjectRepository)(artist_entity_1.Artist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ExposicionesService);
//# sourceMappingURL=exposiciones.service.js.map