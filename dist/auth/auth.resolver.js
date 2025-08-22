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
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
const login_input_1 = require("./dto/login.input");
const register_input_1 = require("./dto/register.input");
const login_response_dto_1 = require("./dto/login-response.dto");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const usuarios_service_1 = require("../usuarios/usuarios.service");
let AuthResolver = class AuthResolver {
    constructor(authService, usuariosService) {
        this.authService = authService;
        this.usuariosService = usuariosService;
    }
    usuariosPorRol(rol) {
        return this.usuariosService.findByRole(rol);
    }
    async login(input) {
        const result = await this.authService.login(input);
        console.log('User from service:', result.user);
        return {
            token: result.access_token,
            user: {
                id_usuario: result.user.id_usuario,
                nombre: result.user.nombre,
                email: result.user.email,
                rol: result.user.rol,
            },
        };
    }
    async register(input) {
        const user = await this.authService.register(input);
        return `Usuario ${user.nombre} registrado correctamente`;
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, graphql_1.Query)(() => [usuario_entity_1.Usuario]),
    __param(0, (0, graphql_1.Args)('rol')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "usuariosPorRol", null);
__decorate([
    (0, graphql_1.Mutation)(() => login_response_dto_1.LoginResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_input_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService, usuarios_service_1.UsuariosService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map