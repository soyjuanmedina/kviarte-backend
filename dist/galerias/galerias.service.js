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
exports.GaleriasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const galeria_entity_1 = require("./entities/galeria.entity");
let GaleriasService = class GaleriasService {
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({
            relations: ['propietario', 'exposiciones', 'artists'],
        });
    }
    async findOne(id) {
        return this.repo.findOne({
            where: { id_galeria: id },
            relations: ['propietario', 'exposiciones', 'artists'],
        });
    }
    async create(input) {
        const galeria = this.repo.create(input);
        if (input.usuario_id) {
            galeria.propietario = { id_usuario: input.usuario_id };
            delete galeria.usuario_id;
        }
        const saved = await this.repo.save(galeria);
        return this.findOne(saved.id_galeria);
    }
    async update(id, data) {
        const galeria = await this.repo.findOne({ where: { id_galeria: id } });
        if (!galeria)
            throw new common_1.NotFoundException(`Galería con id ${id} no encontrada`);
        Object.assign(galeria, data);
        await this.repo.save(galeria);
        return this.findOne(id);
    }
    async delete(id) {
        const result = await this.repo.delete(id);
        return result.affected > 0;
    }
};
exports.GaleriasService = GaleriasService;
exports.GaleriasService = GaleriasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(galeria_entity_1.Galeria)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GaleriasService);
//# sourceMappingURL=galerias.service.js.map