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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const gallery_entity_1 = require("../../galleries/entities/gallery.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { name: 'id_user' }),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], User.prototype, "id_user", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], User.prototype, "nombre", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password' }),
    __metadata("design:type", String)
], User.prototype, "password_hash", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ name: 'role', default: 'USER' }),
    __metadata("design:type", String)
], User.prototype, "rol", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)({ name: 'registration_date' }),
    __metadata("design:type", String)
], User.prototype, "registrationDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => [gallery_entity_1.Gallery], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => gallery_entity_1.Gallery, gallery => gallery.owner),
    __metadata("design:type", Array)
], User.prototype, "galleries", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users'),
    (0, graphql_1.ObjectType)()
], User);
//# sourceMappingURL=user.entity.js.map