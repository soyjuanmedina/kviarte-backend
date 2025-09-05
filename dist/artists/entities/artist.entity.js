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
const gallery_entity_1 = require("../../galleries/entities/gallery.entity");
const artwork_entity_1 = require("../../artworks/entities/artwork.entity");
const exhibition_entity_1 = require("../../exhibitions/entities/exhibition.entity");
const graphql_1 = require("@nestjs/graphql");
let Artist = class Artist {
};
exports.Artist = Artist;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Artist.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Artist.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Artist.prototype, "biography", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Artist.prototype, "style", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Artist.prototype, "picture", void 0);
__decorate([
    (0, graphql_1.Field)(() => gallery_entity_1.Gallery, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => gallery_entity_1.Gallery, gallery => gallery.artists, {
        nullable: true,
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'gallery_id' }),
    __metadata("design:type", gallery_entity_1.Gallery)
], Artist.prototype, "gallery", void 0);
__decorate([
    (0, graphql_1.Field)(() => [artwork_entity_1.Artwork], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => artwork_entity_1.Artwork, artwork => artwork.artist),
    __metadata("design:type", Array)
], Artist.prototype, "artworks", void 0);
__decorate([
    (0, graphql_1.Field)(() => [exhibition_entity_1.Exhibition], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => exhibition_entity_1.Exhibition, exhibition => exhibition.artist),
    __metadata("design:type", Array)
], Artist.prototype, "exhibitions", void 0);
exports.Artist = Artist = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('artists')
], Artist);
//# sourceMappingURL=artist.entity.js.map