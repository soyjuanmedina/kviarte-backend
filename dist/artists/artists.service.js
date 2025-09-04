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
const galeria_entity_1 = require("../galerias/entities/galeria.entity");
let ArtistsService = class ArtistsService {
    constructor(artistRepo, galeryRepository) {
        this.artistRepo = artistRepo;
        this.galeryRepository = galeryRepository;
    }
    async findAll() {
        return this.artistRepo.find({ relations: ['galeria', 'obras', 'exposiciones'] });
    }
    async findOne(id) {
        return this.artistRepo.findOne({
            where: { id_artista: id },
            relations: ['galeria', 'obras', 'exposiciones'],
        });
    }
    async create(createArtistInput) {
        const { id_galeria, ...rest } = createArtistInput;
        const artist = this.artistRepo.create(rest);
        if (id_galeria) {
            const galeria = await this.galeryRepository.findOneBy({ id_galeria });
            artist.galeria = galeria;
        }
        return this.artistRepo.save(artist);
    }
    async update(id, data) {
        const artista = await this.artistRepo.findOne({ where: { id_artista: id }, relations: ['galeria'] });
        if (!artista)
            throw new common_1.NotFoundException(`Artista con id ${id} no encontrado`);
        Object.assign(artista, data);
        return this.artistRepo.save(artista);
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
    __param(1, (0, typeorm_1.InjectRepository)(galeria_entity_1.Galeria)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ArtistsService);
//# sourceMappingURL=artists.service.js.map