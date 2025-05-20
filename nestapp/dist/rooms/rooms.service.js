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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const room_entity_1 = require("../entities/room.entity");
let RoomsService = class RoomsService {
    roomRepository;
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    async findAll(skip = 0, limit = 10) {
        return this.roomRepository.find({
            skip,
            take: limit,
        });
    }
    async findOne(id) {
        const room = await this.roomRepository.findOne({ where: { id } });
        if (!room) {
            throw new common_1.NotFoundException(`Salle avec l'ID ${id} non trouvée`);
        }
        return room;
    }
    async create(createRoomDto) {
        const room = this.roomRepository.create(createRoomDto);
        return this.roomRepository.save(room);
    }
    async update(id, updateRoomDto) {
        const room = await this.findOne(id);
        if (updateRoomDto.name !== undefined) {
            room.name = updateRoomDto.name;
        }
        if (updateRoomDto.capacity !== undefined) {
            room.capacity = updateRoomDto.capacity;
        }
        if (updateRoomDto.location !== undefined) {
            room.location = updateRoomDto.location;
        }
        return this.roomRepository.save(room);
    }
    async remove(id) {
        const result = await this.roomRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Salle avec l'ID ${id} non trouvée`);
        }
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map