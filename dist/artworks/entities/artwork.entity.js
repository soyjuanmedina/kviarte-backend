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
exports.Artwork = void 0;
const typeorm_1 = require("typeorm");
const artist_entity_1 = require("../../artists/entities/artist.entity");
const exhibition_entity_1 = require("../../exhibitions/entities/exhibition.entity");
const gallery_entity_1 = require("../../galleries/entities/gallery.entity");
const promotion_entity_1 = require("../../promotions/entities/promotion.entity");
const graphql_1 = require("@nestjs/graphql");
let Artwork = class Artwork {
};
exports.Artwork = Artwork;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Artwork.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Artwork.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Artwork.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, typeorm_1.Column)('numeric', { nullable: true }),
    __metadata("design:type", Number)
], Artwork.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Artwork.prototype, "style", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Artwork.prototype, "picture", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: true }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Artwork.prototype, "available", void 0);
__decorate([
    (0, graphql_1.Field)(() => artist_entity_1.Artist),
    (0, typeorm_1.ManyToOne)(() => artist_entity_1.Artist, (artist) => artist.artworks, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'artist_id' }),
    __metadata("design:type", artist_entity_1.Artist)
], Artwork.prototype, "artist", void 0);
__decorate([
    (0, graphql_1.Field)(() => gallery_entity_1.Gallery),
    (0, typeorm_1.ManyToOne)(() => gallery_entity_1.Gallery, (gallery) => gallery.artworks, {
        nullable: false,
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'gallery_id' }),
    __metadata("design:type", gallery_entity_1.Gallery)
], Artwork.prototype, "gallery", void 0);
__decorate([
    (0, graphql_1.Field)(() => exhibition_entity_1.Exhibition, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => exhibition_entity_1.Exhibition, (exhibition) => exhibition.artworks, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'exhibition_id' }),
    __metadata("design:type", exhibition_entity_1.Exhibition)
], Artwork.prototype, "exhibition", void 0);
__decorate([
    (0, graphql_1.Field)(() => [promotion_entity_1.Promotion], { nullable: true }),
    (0, typeorm_1.ManyToMany)(() => promotion_entity_1.Promotion, (promotion) => promotion.artworks),
    (0, typeorm_1.JoinTable)({
        name: 'promotions_artworks',
        joinColumn: { name: 'artwork_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'promotion_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Artwork.prototype, "promotions", void 0);
exports.Artwork = Artwork = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('artworks')
], Artwork);
//# sourceMappingURL=artwork.entity.js.map