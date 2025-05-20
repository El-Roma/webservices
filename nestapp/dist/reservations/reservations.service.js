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
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reservation_entity_1 = require("../entities/reservation.entity");
const users_service_1 = require("../users/users.service");
const rooms_service_1 = require("../rooms/rooms.service");
let ReservationsService = class ReservationsService {
    reservationRepository;
    usersService;
    roomsService;
    constructor(reservationRepository, usersService, roomsService) {
        this.reservationRepository = reservationRepository;
        this.usersService = usersService;
        this.roomsService = roomsService;
    }
    async findAll(skip = 0, limit = 10) {
        return this.reservationRepository.find({
            skip,
            take: limit,
            relations: ['user', 'room'],
        });
    }
    async findOne(id) {
        const reservation = await this.reservationRepository.findOne({
            where: { id },
            relations: ['user', 'room'],
        });
        if (!reservation) {
            throw new common_1.NotFoundException(`Réservation avec l'ID ${id} non trouvée`);
        }
        return reservation;
    }
    async create(createReservationDto) {
        const user = await this.usersService.findOne(createReservationDto.user_id);
        const room = await this.roomsService.findOne(createReservationDto.room_id);
        const startTime = new Date(createReservationDto.start_time);
        const endTime = new Date(createReservationDto.end_time);
        if (endTime <= startTime) {
            throw new common_1.BadRequestException('La date de fin doit être postérieure à la date de début');
        }
        const conflictingReservation = await this.reservationRepository.findOne({
            where: {
                room: { id: room.id },
                status: 'approved',
                start_time: startTime,
                end_time: endTime,
            },
        });
        if (conflictingReservation) {
            throw new common_1.BadRequestException('Cette salle est déjà réservée pour ce créneau horaire');
        }
        const reservation = this.reservationRepository.create({
            user,
            room,
            start_time: startTime,
            end_time: endTime,
            status: 'pending',
        });
        return this.reservationRepository.save(reservation);
    }
    async update(id, updateReservationDto) {
        const reservation = await this.findOne(id);
        if (updateReservationDto.user_id !== undefined) {
            const user = await this.usersService.findOne(updateReservationDto.user_id);
            reservation.user = user;
        }
        if (updateReservationDto.room_id !== undefined) {
            const room = await this.roomsService.findOne(updateReservationDto.room_id);
            reservation.room = room;
        }
        if (updateReservationDto.start_time !== undefined) {
            reservation.start_time = new Date(updateReservationDto.start_time);
        }
        if (updateReservationDto.end_time !== undefined) {
            reservation.end_time = new Date(updateReservationDto.end_time);
        }
        if (reservation.end_time <= reservation.start_time) {
            throw new common_1.BadRequestException('La date de fin doit être postérieure à la date de début');
        }
        return this.reservationRepository.save(reservation);
    }
    async remove(id) {
        const result = await this.reservationRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Réservation avec l'ID ${id} non trouvée`);
        }
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        rooms_service_1.RoomsService])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map