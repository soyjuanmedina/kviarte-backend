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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exposicion = void 0;
const typeorm_1 = require("typeorm");
const galeria_entity_1 = require("../../galerias/entities/galeria.entity");
const obra_entity_1 = require("../../obras/entities/obra.entity");
const artista_entity_1 = require("../../artistas/entities/artista.entity");
let Exposicion = class Exposicion {
};
exports.Exposicion = Exposicion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Exposicion.prototype, "id_exposicion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Exposicion.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Exposicion.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => galeria_entity_1.Galeria, galeria => galeria.exposiciones),
    __metadata("design:type", galeria_entity_1.Galeria)
], Exposicion.prototype, "galeria", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => artista_entity_1.Artista, artista => artista.exposiciones, { nullable: true }),
    __metadata("design:type", artista_entity_1.Artista)
], Exposicion.prototype, "artista", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => obra_entity_1.Obra, obra => obra.exposicion),
    __metadata("design:type", Array)
], Exposicion.prototype, "obras", void 0);
exports.Exposicion = Exposicion = __decorate([
    (0, typeorm_1.Entity)()
], Exposicion);
//# sourceMappingURL=exposicion.entity.js.map