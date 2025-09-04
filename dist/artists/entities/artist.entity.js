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
exports.Artist = void 0;
const typeorm_1 = require("typeorm");
const galeria_entity_1 = require("../../galerias/entities/galeria.entity");
const obra_entity_1 = require("../../obras/entities/obra.entity");
const exposicion_entity_1 = require("../../exposiciones/entities/exposicion.entity");
const graphql_1 = require("@nestjs/graphql");
let Artist = class Artist {
};
exports.Artist = Artist;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Artist.prototype, "id_artista", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Artist.prototype, "nombre", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Artist.prototype, "biografia", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Artist.prototype, "estilo", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Artist.prototype, "picture", void 0);
__decorate([
    (0, graphql_1.Field)(() => galeria_entity_1.Galeria, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => galeria_entity_1.Galeria, galeria => galeria.artists, {
        nullable: true,
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'id_galeria' }),
    __metadata("design:type", galeria_entity_1.Galeria)
], Artist.prototype, "galeria", void 0);
__decorate([
    (0, graphql_1.Field)(() => [obra_entity_1.Obra], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => obra_entity_1.Obra, obra => obra.artist),
    __metadata("design:type", Array)
], Artist.prototype, "obras", void 0);
__decorate([
    (0, graphql_1.Field)(() => [exposicion_entity_1.Exposicion], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => exposicion_entity_1.Exposicion, exposicion => exposicion.artist),
    __metadata("design:type", Array)
], Artist.prototype, "exposiciones", void 0);
exports.Artist = Artist = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('artistas')
], Artist);
//# sourceMappingURL=artist.entity.js.map