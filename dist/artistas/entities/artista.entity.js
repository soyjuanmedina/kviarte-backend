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
exports.Artista = void 0;
const typeorm_1 = require("typeorm");
const galeria_entity_1 = require("../../galerias/entities/galeria.entity");
const obra_entity_1 = require("../../obras/entities/obra.entity");
const exposicion_entity_1 = require("../../exposiciones/entities/exposicion.entity");
let Artista = class Artista {
};
exports.Artista = Artista;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Artista.prototype, "id_artista", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Artista.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Artista.prototype, "biografia", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Artista.prototype, "estilo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => galeria_entity_1.Galeria, galeria => galeria.artistas),
    __metadata("design:type", galeria_entity_1.Galeria)
], Artista.prototype, "galeria", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => obra_entity_1.Obra, obra => obra.artista),
    __metadata("design:type", Array)
], Artista.prototype, "obras", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exposicion_entity_1.Exposicion, exposicion => exposicion.artista),
    __metadata("design:type", Array)
], Artista.prototype, "exposiciones", void 0);
exports.Artista = Artista = __decorate([
    (0, typeorm_1.Entity)()
], Artista);
//# sourceMappingURL=artista.entity.js.map