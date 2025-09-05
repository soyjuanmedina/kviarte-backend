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
exports.Gallery = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const obra_entity_1 = require("../../obras/entities/obra.entity");
const promotion_entity_1 = require("../../promotions/entities/promotion.entity");
const artist_entity_1 = require("../../artists/entities/artist.entity");
const exhibition_entity_1 = require("../../exhibitions/entities/exhibition.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
let Gallery = class Gallery {
};
exports.Gallery = Gallery;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Gallery.prototype, "id_gallery", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: 'Nombre por defecto' }),
    __metadata("design:type", String)
], Gallery.prototype, "nombre", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gallery.prototype, "descripcion", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gallery.prototype, "direccion", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gallery.prototype, "ciudad", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gallery.prototype, "web", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gallery.prototype, "telefono", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gallery.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Gallery.prototype, "picture", void 0);
__decorate([
    (0, graphql_1.Field)(() => [obra_entity_1.Obra], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => obra_entity_1.Obra, obra => obra.gallery),
    __metadata("design:type", Array)
], Gallery.prototype, "obras", void 0);
__decorate([
    (0, graphql_1.Field)(() => [promotion_entity_1.Promotion], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => promotion_entity_1.Promotion, promotion => promotion.gallery),
    __metadata("design:type", Array)
], Gallery.prototype, "promotions", void 0);
__decorate([
    (0, graphql_1.Field)(() => [artist_entity_1.Artist], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => artist_entity_1.Artist, artist => artist.gallery),
    __metadata("design:type", Array)
], Gallery.prototype, "artists", void 0);
__decorate([
    (0, graphql_1.Field)(() => [exhibition_entity_1.Exhibition], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => exhibition_entity_1.Exhibition, exhibition => exhibition.gallery),
    __metadata("design:type", Array)
], Gallery.prototype, "exhibitions", void 0);
__decorate([
    (0, graphql_1.Field)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, usuario => usuario.galleries),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Gallery.prototype, "propietario", void 0);
exports.Gallery = Gallery = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('galleries')
], Gallery);
//# sourceMappingURL=gallery.entity.js.map