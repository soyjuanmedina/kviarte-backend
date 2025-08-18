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
exports.Oferta = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const galeria_entity_1 = require("../../galerias/entities/galeria.entity");
const obra_entity_1 = require("../../obras/entities/obra.entity");
let Oferta = class Oferta {
};
exports.Oferta = Oferta;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Oferta.prototype, "id_oferta", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Oferta.prototype, "precio", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Oferta.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => galeria_entity_1.Galeria, galeria => galeria.id_galeria),
    __metadata("design:type", galeria_entity_1.Galeria)
], Oferta.prototype, "galeria", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => obra_entity_1.Obra, obra => obra.id_obra),
    __metadata("design:type", obra_entity_1.Obra)
], Oferta.prototype, "obra", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Oferta.prototype, "activa", void 0);
exports.Oferta = Oferta = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Oferta);
//# sourceMappingURL=oferta.entity.js.map