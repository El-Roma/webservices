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
exports.ReservationsController = void 0;
const common_1 = require("@nestjs/common");
const reservations_service_1 = require("./reservations.service");
const reservation_dto_1 = require("../dto/reservation.dto");
const swagger_1 = require("@nestjs/swagger");
const keycloak_auth_guard_1 = require("../auth/keycloak-auth.guard");
const common_dto_1 = require("../dto/common.dto");
let ReservationsController = class ReservationsController {
    reservationsService;
    constructor(reservationsService) {
        this.reservationsService = reservationsService;
    }
    async findAll(query) {
        const reservations = await this.reservationsService.findAll(query.skip, query.limit);
        return { reservations };
    }
    async findOne(id) {
        return this.reservationsService.findOne(id);
    }
    async create(createReservationDto) {
        return this.reservationsService.create(createReservationDto);
    }
    async update(id, updateReservationDto) {
        return this.reservationsService.update(id, updateReservationDto);
    }
    async remove(id) {
        await this.reservationsService.remove(id);
    }
};
exports.ReservationsController = ReservationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer la liste des réservations' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste de réservations récupérée avec succès',
        schema: {
            type: 'object',
            properties: {
                reservations: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/ReservationResponseDto' },
                },
            },
        },
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une réservation par son ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Réservation récupérée avec succès',
        type: reservation_dto_1.ReservationResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Réservation non trouvée',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une nouvelle réservation' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Réservation créée avec succès',
        type: reservation_dto_1.ReservationResponseDto,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reservation_dto_1.CreateReservationDto]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une réservation' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Réservation mise à jour avec succès',
        type: reservation_dto_1.ReservationResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Réservation non trouvée',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, reservation_dto_1.UpdateReservationDto]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une réservation' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Réservation supprimée avec succès',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Réservation non trouvée',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "remove", null);
exports.ReservationsController = ReservationsController = __decorate([
    (0, swagger_1.ApiTags)('reservations'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('api/reservations'),
    (0, common_1.UseGuards)(keycloak_auth_guard_1.KeycloakAuthGuard),
    __metadata("design:paramtypes", [reservations_service_1.ReservationsService])
], ReservationsController);
//# sourceMappingURL=reservations.controller.js.map