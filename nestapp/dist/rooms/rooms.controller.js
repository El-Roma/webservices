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
exports.RoomsController = void 0;
const common_1 = require("@nestjs/common");
const rooms_service_1 = require("./rooms.service");
const room_dto_1 = require("../dto/room.dto");
const swagger_1 = require("@nestjs/swagger");
const keycloak_auth_guard_1 = require("../auth/keycloak-auth.guard");
const common_dto_1 = require("../dto/common.dto");
let RoomsController = class RoomsController {
    roomsService;
    constructor(roomsService) {
        this.roomsService = roomsService;
    }
    async findAll(query) {
        const rooms = await this.roomsService.findAll(query.skip, query.limit);
        return { rooms };
    }
    async findOne(id) {
        return this.roomsService.findOne(id);
    }
    async create(createRoomDto) {
        return this.roomsService.create(createRoomDto);
    }
    async update(id, updateRoomDto) {
        return this.roomsService.update(id, updateRoomDto);
    }
    async remove(id) {
        await this.roomsService.remove(id);
    }
};
exports.RoomsController = RoomsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer la liste des salles' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste de salles récupérée avec succès',
        schema: {
            type: 'object',
            properties: {
                rooms: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/RoomResponseDto' },
                },
            },
        },
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une salle par son ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Salle récupérée avec succès',
        type: room_dto_1.RoomResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Salle non trouvée',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle salle' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Salle créée avec succès',
        type: room_dto_1.RoomResponseDto,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une salle' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Salle mise à jour avec succès',
        type: room_dto_1.RoomResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Salle non trouvée',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, room_dto_1.UpdateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une salle' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Salle supprimée avec succès',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Salle non trouvée',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "remove", null);
exports.RoomsController = RoomsController = __decorate([
    (0, swagger_1.ApiTags)('rooms'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('api/rooms'),
    (0, common_1.UseGuards)(keycloak_auth_guard_1.KeycloakAuthGuard),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomsController);
//# sourceMappingURL=rooms.controller.js.map