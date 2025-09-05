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
exports.ObrasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const obra_entity_1 = require("./entities/obra.entity");
const artist_entity_1 = require("../artists/entities/artist.entity");
const exhibition_entity_1 = require("../exhibitions/entities/exhibition.entity");
let ObrasService = class ObrasService {
    constructor(repo, artistRepo, exhibitionRepo) {
        this.repo = repo;
        this.artistRepo = artistRepo;
        this.exhibitionRepo = exhibitionRepo;
    }
    async findAll() {
        return this.repo.find({ relations: ['artist', 'exhibition'] });
    }
    async findOne(id) {
        return this.repo.findOne({
            where: { id_obra: id },
            relations: [
                'artist',
                'exhibition',
                'exhibition.gallery'
            ],
        });
    }
    async create(input) {
        const artist = await this.artistRepo.findOne({
            where: { id_artista: input.id_artista },
        });
        const exhibition = input.id_exhibition
            ? await this.exhibitionRepo.findOne({
                where: { id_exhibition: input.id_exhibition },
            })
            : null;
        const obra = this.repo.create({
            titulo: input.titulo,
            descripcion: input.descripcion,
            estilo: input.estilo,
            picture: input.picture,
            artist,
            exhibition,
        });
        return this.repo.save(obra);
    }
    async update(id, input) {
        const obra = await this.repo.findOne({ where: { id_obra: id } });
        if (!obra) {
            throw new common_1.NotFoundException(`Obra con id ${id} no encontrada`);
        }
        if (input.id_artista) {
            const artist = await this.artistRepo.findOne({ where: { id_artista: input.id_artista } });
            obra.artist = artist;
        }
        if (input.id_exhibition !== undefined) {
            const exhibition = input.id_exhibition
                ? await this.exhibitionRepo.findOne({ where: { id_exhibition: input.id_exhibition } })
                : null;
            obra.exhibition = exhibition;
        }
        if (input.titulo !== undefined)
            obra.titulo = input.titulo;
        if (input.descripcion !== undefined)
            obra.descripcion = input.descripcion;
        if (input.estilo !== undefined)
            obra.estilo = input.estilo;
        if (input.picture !== undefined)
            obra.picture = input.picture;
        return this.repo.save(obra);
    }
    async delete(id) {
        const obra = await this.repo.findOne({ where: { id_obra: id } });
        if (!obra) {
            throw new common_1.NotFoundException(`Obra con id ${id} no encontrada`);
        }
        await this.repo.remove(obra);
        return true;
    }
    async findByExhibition(id_exhibition) {
        return this.repo.find({
            where: { exhibition: { id_exhibition } },
            relations: ['artist', 'gallery', 'exhibition'],
        });
    }
};
exports.ObrasService = ObrasService;
exports.ObrasService = ObrasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(obra_entity_1.Obra)),
    __param(1, (0, typeorm_1.InjectRepository)(artist_entity_1.Artist)),
    __param(2, (0, typeorm_1.InjectRepository)(exhibition_entity_1.Exhibition)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ObrasService);
//# sourceMappingURL=obras.service.js.map