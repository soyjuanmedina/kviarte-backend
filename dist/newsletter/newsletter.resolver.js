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
exports.NewsletterResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const newsletter_service_1 = require("./newsletter.service");
const subscription_entity_1 = require("./entities/subscription.entity");
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let NewsletterResolver = class NewsletterResolver {
    constructor(service) {
        this.service = service;
    }
    subscriptions() {
        return this.service.findAll();
    }
    subscribe(email) {
        return this.service.subscribe(email);
    }
    unsubscribe(id) {
        this.service.unsubscribe(id);
        return 'Suscripción cancelada';
    }
    pruebaNewsletter() {
        return this.service.pruebaNewsletter().mensaje;
    }
};
exports.NewsletterResolver = NewsletterResolver;
__decorate([
    (0, graphql_1.Query)(() => [subscription_entity_1.Subscription]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NewsletterResolver.prototype, "subscriptions", null);
__decorate([
    (0, graphql_1.Mutation)(() => subscription_entity_1.Subscription),
    __param(0, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NewsletterResolver.prototype, "subscribe", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NewsletterResolver.prototype, "unsubscribe", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NewsletterResolver.prototype, "pruebaNewsletter", null);
exports.NewsletterResolver = NewsletterResolver = __decorate([
    (0, graphql_1.Resolver)(() => subscription_entity_1.Subscription),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [newsletter_service_1.NewsletterService])
], NewsletterResolver);
//# sourceMappingURL=newsletter.resolver.js.map