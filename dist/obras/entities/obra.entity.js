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
exports.Obra = void 0;
const typeorm_1 = require("typeorm");
const artist_entity_1 = require("../../artists/entities/artist.entity");
const exposicion_entity_1 = require("../../exposiciones/entities/exposicion.entity");
const galeria_entity_1 = require("../../galerias/entities/galeria.entity");
const promotion_entity_1 = require("../../promotions/entities/promotion.entity");
const graphql_1 = require("@nestjs/graphql");
let Obra = class Obra {
};
exports.Obra = Obra;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Obra.prototype, "id_obra", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Obra.prototype, "titulo", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Obra.prototype, "descripcion", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Obra.prototype, "estilo", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], Obra.prototype, "precio", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Obra.prototype, "picture", void 0);
__decorate([
    (0, graphql_1.Field)(() => artist_entity_1.Artist),
    (0, typeorm_1.ManyToOne)(() => artist_entity_1.Artist, artist => artist.obras, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'id_artista' }),
    __metadata("design:type", artist_entity_1.Artist)
], Obra.prototype, "artist", void 0);
__decorate([
    (0, graphql_1.Field)(() => galeria_entity_1.Galeria),
    (0, typeorm_1.ManyToOne)(() => galeria_entity_1.Galeria, galeria => galeria.obras, { nullable: false, eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_galeria' }),
    __metadata("design:type", galeria_entity_1.Galeria)
], Obra.prototype, "galeria", void 0);
__decorate([
    (0, graphql_1.Field)(() => exposicion_entity_1.Exposicion, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => exposicion_entity_1.Exposicion, exposicion => exposicion.obras, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'id_exposicion' }),
    __metadata("design:type", exposicion_entity_1.Exposicion)
], Obra.prototype, "exposicion", void 0);
__decorate([
    (0, graphql_1.Field)(() => [promotion_entity_1.Promotion], { nullable: true }),
    (0, typeorm_1.ManyToMany)(() => promotion_entity_1.Promotion, promotion => promotion.artworks),
    __metadata("design:type", Array)
], Obra.prototype, "promotions", void 0);
exports.Obra = Obra = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('obras')
], Obra);
//# sourceMappingURL=obra.entity.js.map