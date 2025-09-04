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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const promotions_service_1 = require("./promotions.service");
const create_promotion_input_1 = require("./dto/create-promotion.input");
const promotion_entity_1 = require("./entities/promotion.entity");
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let PromotionsResolver = class PromotionsResolver {
    constructor(service) {
        this.service = service;
    }
    promotions() {
        return this.service.findAll();
    }
    promotion(id) {
        return this.service.findOne(id);
    }
    createPromotion(input) {
        return this.service.create(input);
    }
    updatePromotion(id, input) {
        return this.service.update(id, input);
    }
    removePromotion(id) {
        return this.service.remove(id);
    }
};
exports.PromotionsResolver = PromotionsResolver;
__decorate([
    (0, graphql_1.Query)(() => [promotion_entity_1.Promotion]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PromotionsResolver.prototype, "promotions", null);
__decorate([
    (0, graphql_1.Query)(() => promotion_entity_1.Promotion),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PromotionsResolver.prototype, "promotion", null);
__decorate([
    (0, graphql_1.Mutation)(() => promotion_entity_1.Promotion),
    (0, roles_decorator_1.Roles)('ADMIN', 'GALLERY'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_promotion_input_1.CreatePromotionInput]),
    __metadata("design:returntype", void 0)
], PromotionsResolver.prototype, "createPromotion", null);
__decorate([
    (0, graphql_1.Mutation)(() => promotion_entity_1.Promotion),
    (0, roles_decorator_1.Roles)('ADMIN', 'GALLERY'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_promotion_input_1.CreatePromotionInput]),
    __metadata("design:returntype", void 0)
], PromotionsResolver.prototype, "updatePromotion", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, roles_decorator_1.Roles)('ADMIN', 'GALLERY'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PromotionsResolver.prototype, "removePromotion", null);
exports.PromotionsResolver = PromotionsResolver = __decorate([
    (0, graphql_1.Resolver)(() => promotion_entity_1.Promotion),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [promotions_service_1.PromotionsService])
], PromotionsResolver);
//# sourceMappingURL=promotions.resolver.js.map