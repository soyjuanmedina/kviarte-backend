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
const galeria_entity_1 = require("../../galerias/entities/galeria.entity");
const obra_entity_1 = require("../../obras/entities/obra.entity");
let Promotion = class Promotion {
};
exports.Promotion = Promotion;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_oferta' }),
    __metadata("design:type", Number)
], Promotion.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Promotion.prototype, "code", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Promotion.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Promotion.prototype, "discount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ name: 'fecha_inicio', type: 'date' }),
    __metadata("design:type", Date)
], Promotion.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ name: 'fecha_fin', type: 'date' }),
    __metadata("design:type", Date)
], Promotion.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => galeria_entity_1.Galeria),
    (0, typeorm_1.ManyToOne)(() => galeria_entity_1.Galeria, galeria => galeria.promotions, { onDelete: 'CASCADE' }),
    __metadata("design:type", galeria_entity_1.Galeria)
], Promotion.prototype, "galeria", void 0);
__decorate([
    (0, graphql_1.Field)(() => [obra_entity_1.Obra], { nullable: true }),
    (0, typeorm_1.ManyToMany)(() => obra_entity_1.Obra, obra => obra.promotions, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: 'ofertas_obras',
        joinColumn: { name: 'id_oferta', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'id_obra', referencedColumnName: 'id_obra' }
    }),
    __metadata("design:type", Array)
], Promotion.prototype, "artworks", void 0);
exports.Promotion = Promotion = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('promotions')
], Promotion);
//# sourceMappingURL=promotion.entity.js.map