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
exports.UpdateReservationInput = exports.CreateReservationInput = exports.UpdateRoomInput = exports.CreateRoomInput = exports.User = exports.Reservation = exports.Room = void 0;
const graphql_1 = require("@nestjs/graphql");
let Room = class Room {
    id;
    name;
    capacity;
    location;
    created_at;
};
exports.Room = Room;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Room.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Room.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Room.prototype, "capacity", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Room.prototype, "location", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Room.prototype, "created_at", void 0);
exports.Room = Room = __decorate([
    (0, graphql_1.ObjectType)()
], Room);
let Reservation = class Reservation {
    id;
    user_id;
    room_id;
    start_time;
    end_time;
    created_at;
};
exports.Reservation = Reservation;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Reservation.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Reservation.prototype, "user_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Reservation.prototype, "room_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Reservation.prototype, "start_time", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Reservation.prototype, "end_time", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Reservation.prototype, "created_at", void 0);
exports.Reservation = Reservation = __decorate([
    (0, graphql_1.ObjectType)()
], Reservation);
let User = class User {
    id;
    keycloak_id;
    created_at;
    email;
};
exports.User = User;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "keycloak_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
exports.User = User = __decorate([
    (0, graphql_1.ObjectType)()
], User);
let CreateRoomInput = class CreateRoomInput {
    name;
    capacity;
    location;
};
exports.CreateRoomInput = CreateRoomInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateRoomInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateRoomInput.prototype, "capacity", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateRoomInput.prototype, "location", void 0);
exports.CreateRoomInput = CreateRoomInput = __decorate([
    (0, graphql_1.InputType)()
], CreateRoomInput);
let UpdateRoomInput = class UpdateRoomInput {
    id;
    name;
    capacity;
    location;
};
exports.UpdateRoomInput = UpdateRoomInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], UpdateRoomInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateRoomInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UpdateRoomInput.prototype, "capacity", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateRoomInput.prototype, "location", void 0);
exports.UpdateRoomInput = UpdateRoomInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateRoomInput);
let CreateReservationInput = class CreateReservationInput {
    user_id;
    room_id;
    start_time;
    end_time;
};
exports.CreateReservationInput = CreateReservationInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateReservationInput.prototype, "user_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateReservationInput.prototype, "room_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], CreateReservationInput.prototype, "start_time", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], CreateReservationInput.prototype, "end_time", void 0);
exports.CreateReservationInput = CreateReservationInput = __decorate([
    (0, graphql_1.InputType)()
], CreateReservationInput);
let UpdateReservationInput = class UpdateReservationInput {
    id;
    user_id;
    room_id;
    start_time;
    end_time;
};
exports.UpdateReservationInput = UpdateReservationInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], UpdateReservationInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UpdateReservationInput.prototype, "user_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UpdateReservationInput.prototype, "room_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], UpdateReservationInput.prototype, "start_time", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], UpdateReservationInput.prototype, "end_time", void 0);
exports.UpdateReservationInput = UpdateReservationInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateReservationInput);
//# sourceMappingURL=types.js.map