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
exports.AppResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("./types");
const types_2 = require("./types");
let AppResolver = class AppResolver {
    async listRooms(skip, limit) {
        return [];
    }
    async room(id) {
        return {
            id: '',
            name: '',
            capacity: 0,
            created_at: new Date()
        };
    }
    async listReservations(skip, limit) {
        return [];
    }
    async reservation(id) {
        return {
            id: '',
            user_id: 0,
            room_id: 0,
            start_time: new Date(),
            end_time: new Date(),
            created_at: new Date()
        };
    }
    async listUsers(skip, limit) {
        return [];
    }
    async user(id) {
        return {
            id: '',
            keycloak_id: '',
            created_at: new Date()
        };
    }
    async createRoom(input) {
        return {
            id: '',
            name: input.name,
            capacity: input.capacity,
            location: input.location,
            created_at: new Date()
        };
    }
    async updateRoom(input) {
        return {
            id: input.id,
            name: input.name || '',
            capacity: input.capacity || 0,
            location: input.location,
            created_at: new Date()
        };
    }
    async deleteRoom(id) {
        return true;
    }
    async createReservation(input) {
        return {
            id: '',
            user_id: input.user_id,
            room_id: input.room_id,
            start_time: input.start_time,
            end_time: input.end_time,
            created_at: new Date()
        };
    }
    async updateReservation(input) {
        return {
            id: input.id,
            user_id: input.user_id || 0,
            room_id: input.room_id || 0,
            start_time: input.start_time || new Date(),
            end_time: input.end_time || new Date(),
            created_at: new Date()
        };
    }
    async deleteReservation(id) {
        return true;
    }
};
exports.AppResolver = AppResolver;
__decorate([
    (0, graphql_1.Query)(() => [types_1.Room]),
    __param(0, (0, graphql_1.Args)('skip', { nullable: true })),
    __param(1, (0, graphql_1.Args)('limit', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AppResolver.prototype, "listRooms", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.Room),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppResolver.prototype, "room", null);
__decorate([
    (0, graphql_1.Query)(() => [types_1.Reservation]),
    __param(0, (0, graphql_1.Args)('skip', { nullable: true })),
    __param(1, (0, graphql_1.Args)('limit', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AppResolver.prototype, "listReservations", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.Reservation),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppResolver.prototype, "reservation", null);
__decorate([
    (0, graphql_1.Query)(() => [types_1.User]),
    __param(0, (0, graphql_1.Args)('skip', { nullable: true })),
    __param(1, (0, graphql_1.Args)('limit', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AppResolver.prototype, "listUsers", null);
__decorate([
    (0, graphql_1.Query)(() => types_1.User),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppResolver.prototype, "user", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.Room),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_2.CreateRoomInput]),
    __metadata("design:returntype", Promise)
], AppResolver.prototype, "createRoom", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.Room),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_2.UpdateRoomInput]),
    __metadata("design:returntype", Promise)
], AppResolver.prototype, "updateRoom", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppResolver.prototype, "deleteRoom", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.Reservation),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_2.CreateReservationInput]),
    __metadata("design:returntype", Promise)
], AppResolver.prototype, "createReservation", null);
__decorate([
    (0, graphql_1.Mutation)(() => types_1.Reservation),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_2.UpdateReservationInput]),
    __metadata("design:returntype", Promise)
], AppResolver.prototype, "updateReservation", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppResolver.prototype, "deleteReservation", null);
exports.AppResolver = AppResolver = __decorate([
    (0, graphql_1.Resolver)()
], AppResolver);
//# sourceMappingURL=resolver.js.map