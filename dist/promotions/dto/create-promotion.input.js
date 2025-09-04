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
exports.CreatePromotionInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreatePromotionInput = class CreatePromotionInput {
};
exports.CreatePromotionInput = CreatePromotionInput;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreatePromotionInput.prototype, "code", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreatePromotionInput.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], CreatePromotionInput.prototype, "discount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], CreatePromotionInput.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], CreatePromotionInput.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreatePromotionInput.prototype, "galleryId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int], { nullable: true }),
    __metadata("design:type", Array)
], CreatePromotionInput.prototype, "artworkIds", void 0);
exports.CreatePromotionInput = CreatePromotionInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePromotionInput);
//# sourceMappingURL=create-promotion.input.js.map