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
exports.Promotion = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const gallery_entity_1 = require("../../galleries/entities/gallery.entity");
const artwork_entity_1 = require("../../artworks/entities/artwork.entity");
let Promotion = class Promotion {
    get startDate() {
        return this._startDate ? new Date(this._startDate) : null;
    }
    set startDate(value) {
        this._startDate = value ? value.toISOString().split('T')[0] : null;
    }
    get endDate() {
        return this._endDate ? new Date(this._endDate) : null;
    }
    set endDate(value) {
        this._endDate = value ? value.toISOString().split('T')[0] : null;
    }
};
exports.Promotion = Promotion;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Promotion.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Promotion.prototype, "discount", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Promotion.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: true }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Promotion.prototype, "active", void 0);
__decorate([
    (0, graphql_1.Field)(() => gallery_entity_1.Gallery),
    (0, typeorm_1.ManyToOne)(() => gallery_entity_1.Gallery, gallery => gallery.promotions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'gallery_id' }),
    __metadata("design:type", gallery_entity_1.Gallery)
], Promotion.prototype, "gallery", void 0);
__decorate([
    (0, graphql_1.Field)(() => [artwork_entity_1.Artwork], { nullable: true }),
    (0, typeorm_1.ManyToMany)(() => artwork_entity_1.Artwork, artwork => artwork.promotions, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: 'promotions_artworks',
        joinColumn: { name: 'promotion_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'artwork_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Promotion.prototype, "artworks", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], Promotion.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date' }),
    __metadata("design:type", String)
], Promotion.prototype, "_startDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Promotion.prototype, "startDate", null);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'date' }),
    __metadata("design:type", String)
], Promotion.prototype, "_endDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Promotion.prototype, "endDate", null);
exports.Promotion = Promotion = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('promotions')
], Promotion);
//# sourceMappingURL=promotion.entity.js.map