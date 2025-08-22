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
exports.Galeria = void 0;
const typeorm_1 = require("typeorm");
const exposicion_entity_1 = require("../../exposiciones/entities/exposicion.entity");
const artist_entity_1 = require("../../artists/entities/artist.entity");
const graphql_1 = require("@nestjs/graphql");
let Galeria = class Galeria {
};
exports.Galeria = Galeria;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_galeria' }),
    __metadata("design:type", Number)
], Galeria.prototype, "id_galeria", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Galeria.prototype, "nombre", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Galeria.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Galeria.prototype, "telefono", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Galeria.prototype, "descripcion", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Galeria.prototype, "direccion", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Galeria.prototype, "ciudad", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Galeria.prototype, "web", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Galeria.prototype, "email_contacto", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Galeria.prototype, "usuario_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => [exposicion_entity_1.Exposicion], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => exposicion_entity_1.Exposicion, exposicion => exposicion.galeria),
    __metadata("design:type", Array)
], Galeria.prototype, "exposiciones", void 0);
__decorate([
    (0, graphql_1.Field)(() => [artist_entity_1.Artist], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => artist_entity_1.Artist, artist => artist.galeria),
    __metadata("design:type", Array)
], Galeria.prototype, "artists", void 0);
exports.Galeria = Galeria = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('galerias')
], Galeria);
//# sourceMappingURL=galeria.entity.js.map