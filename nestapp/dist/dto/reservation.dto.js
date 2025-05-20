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
exports.ReservationResponseDto = exports.UpdateReservationDto = exports.CreateReservationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateReservationDto {
    user_id;
    room_id;
    start_time;
    end_time;
}
exports.CreateReservationDto = CreateReservationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateReservationDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateReservationDto.prototype, "room_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CreateReservationDto.prototype, "start_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CreateReservationDto.prototype, "end_time", void 0);
class UpdateReservationDto {
    user_id;
    room_id;
    start_time;
    end_time;
}
exports.UpdateReservationDto = UpdateReservationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], UpdateReservationDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], UpdateReservationDto.prototype, "room_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], UpdateReservationDto.prototype, "start_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], UpdateReservationDto.prototype, "end_time", void 0);
class ReservationResponseDto {
    id;
    user_id;
    room_id;
    start_time;
    end_time;
    created_at;
}
exports.ReservationResponseDto = ReservationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReservationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReservationResponseDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReservationResponseDto.prototype, "room_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ReservationResponseDto.prototype, "start_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ReservationResponseDto.prototype, "end_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ReservationResponseDto.prototype, "created_at", void 0);
//# sourceMappingURL=reservation.dto.js.map