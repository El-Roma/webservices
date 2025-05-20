import { Room, Reservation, User } from './types';
import { CreateRoomInput, UpdateRoomInput, CreateReservationInput, UpdateReservationInput } from './types';
export declare class AppResolver {
    listRooms(skip?: number, limit?: number): Promise<Room[]>;
    room(id: string): Promise<Room>;
    listReservations(skip?: number, limit?: number): Promise<Reservation[]>;
    reservation(id: string): Promise<Reservation>;
    listUsers(skip?: number, limit?: number): Promise<User[]>;
    user(id: string): Promise<User>;
    createRoom(input: CreateRoomInput): Promise<Room>;
    updateRoom(input: UpdateRoomInput): Promise<Room>;
    deleteRoom(id: string): Promise<boolean>;
    createReservation(input: CreateReservationInput): Promise<Reservation>;
    updateReservation(input: UpdateReservationInput): Promise<Reservation>;
    deleteReservation(id: string): Promise<boolean>;
}
