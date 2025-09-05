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
exports.Exhibition = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const gallery_entity_1 = require("../../galleries/entities/gallery.entity");
const artwork_entity_1 = require("../../artworks/entities/artwork.entity");
const artist_entity_1 = require("../../artists/entities/artist.entity");
let Exhibition = class Exhibition {
};
exports.Exhibition = Exhibition;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { name: 'id' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Exhibition.prototype, "id_exhibition", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Exhibition.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Exhibition.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Exhibition.prototype, "picture", void 0);
__decorate([
    (0, graphql_1.Field)(() => gallery_entity_1.Gallery),
    (0, typeorm_1.ManyToOne)(() => gallery_entity_1.Gallery, gallery => gallery.exhibitions),
    (0, typeorm_1.JoinColumn)({ name: 'gallery_id' }),
    __metadata("design:type", gallery_entity_1.Gallery)
], Exhibition.prototype, "gallery", void 0);
__decorate([
    (0, graphql_1.Field)(() => artist_entity_1.Artist, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => artist_entity_1.Artist, artist => artist.exhibitions, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'artist_id' }),
    __metadata("design:type", artist_entity_1.Artist)
], Exhibition.prototype, "artist", void 0);
__decorate([
    (0, graphql_1.Field)(() => [artwork_entity_1.Artwork], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => artwork_entity_1.Artwork, artwork => artwork.exhibition),
    __metadata("design:type", Array)
], Exhibition.prototype, "artworks", void 0);
exports.Exhibition = Exhibition = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'exhibitions' })
], Exhibition);
//# sourceMappingURL=exhibition.entity.js.map