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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const user_dto_1 = require("../dto/user.dto");
const swagger_1 = require("@nestjs/swagger");
const keycloak_auth_guard_1 = require("../auth/keycloak-auth.guard");
const common_dto_1 = require("../dto/common.dto");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAll(query) {
        const users = await this.usersService.findAll(query.skip, query.limit);
        return { users };
    }
    async findOne(id) {
        return this.usersService.findOne(id);
    }
    async create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    async remove(id) {
        await this.usersService.remove(id);
    }
    async extractUserData(id) {
        return this.usersService.extractUserData(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer la liste des utilisateurs' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste d\'utilisateurs récupérée avec succès',
        type: user_dto_1.PaginatedUsersResponseDto,
    }),
    (0, common_1.UseGuards)(keycloak_auth_guard_1.KeycloakAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un utilisateur par son ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Utilisateur récupéré avec succès',
        type: user_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Utilisateur non trouvé',
    }),
    (0, common_1.UseGuards)(keycloak_auth_guard_1.KeycloakAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('users'),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouvel utilisateur' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Utilisateur créé avec succès',
        type: user_dto_1.UserResponseDto,
    }),
    (0, common_1.UseGuards)(keycloak_auth_guard_1.KeycloakAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un utilisateur' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Utilisateur mis à jour avec succès',
        type: user_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Utilisateur non trouvé',
    }),
    (0, common_1.UseGuards)(keycloak_auth_guard_1.KeycloakAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('users/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un utilisateur' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Utilisateur supprimé avec succès',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Utilisateur non trouvé',
    }),
    (0, common_1.UseGuards)(keycloak_auth_guard_1.KeycloakAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('users/:id/extract'),
    (0, swagger_1.ApiOperation)({ summary: 'Extraire les données d\'un utilisateur' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Données de l\'utilisateur extraites avec succès',
        type: user_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Utilisateur non trouvé',
    }),
    (0, common_1.UseGuards)(keycloak_auth_guard_1.KeycloakAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "extractUserData", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map