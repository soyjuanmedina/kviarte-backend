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
const artista_entity_1 = require("../artistas/entities/artista.entity");
const exposicion_entity_1 = require("../exposiciones/entities/exposicion.entity");
let ObrasService = class ObrasService {
    constructor(obraRepository, artistaRepository, exposicionRepository) {
        this.obraRepository = obraRepository;
        this.artistaRepository = artistaRepository;
        this.exposicionRepository = exposicionRepository;
    }
    async findAll() {
        return this.obraRepository.find({ relations: ['artista', 'exposicion'] });
    }
    async findOne(id) {
        const obra = await this.obraRepository.findOne({
            where: { id_obra: id },
            relations: ['artista', 'exposicion'],
        });
        if (!obra)
            throw new common_1.NotFoundException(`Obra #${id} not found`);
        return obra;
    }
    async create(createObraInput) {
        const { titulo, descripcion, estilo, id_artista, id_exposicion } = createObraInput;
        const artista = await this.artistaRepository.findOne({ where: { id_artista } });
        if (!artista)
            throw new common_1.NotFoundException(`Artista #${id_artista} not found`);
        let exposicion = null;
        if (id_exposicion) {
            exposicion = await this.exposicionRepository.findOne({ where: { id_exposicion } });
            if (!exposicion)
                throw new common_1.NotFoundException(`Exposición #${id_exposicion} not found`);
        }
        const obraPartial = {
            titulo,
            descripcion,
            artista,
            exposicion,
        };
        if (estilo)
            obraPartial.estilo = estilo;
        const obra = this.obraRepository.create(obraPartial);
        return this.obraRepository.save(obra);
    }
    async update(id, updateObraInput) {
        const obra = await this.findOne(id);
        if (updateObraInput.titulo)
            obra.titulo = updateObraInput.titulo;
        if (updateObraInput.descripcion)
            obra.descripcion = updateObraInput.descripcion;
        if (updateObraInput.estilo)
            obra.estilo = updateObraInput.estilo;
        if (updateObraInput.id_artista) {
            const artista = await this.artistaRepository.findOne({ where: { id_artista: updateObraInput.id_artista } });
            if (!artista)
                throw new common_1.NotFoundException(`Artista #${updateObraInput.id_artista} not found`);
            obra.artista = artista;
        }
        if (updateObraInput.id_exposicion) {
            const exposicion = await this.exposicionRepository.findOne({ where: { id_exposicion: updateObraInput.id_exposicion } });
            if (!exposicion)
                throw new common_1.NotFoundException(`Exposición #${updateObraInput.id_exposicion} not found`);
            obra.exposicion = exposicion;
        }
        return this.obraRepository.save(obra);
    }
    async remove(id) {
        const result = await this.obraRepository.delete(id);
        return result.affected > 0;
    }
};
exports.ObrasService = ObrasService;
exports.ObrasService = ObrasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(obra_entity_1.Obra)),
    __param(1, (0, typeorm_1.InjectRepository)(artista_entity_1.Artista)),
    __param(2, (0, typeorm_1.InjectRepository)(exposicion_entity_1.Exposicion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ObrasService);
//# sourceMappingURL=obras.service.js.map