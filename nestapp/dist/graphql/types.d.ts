export declare class Room {
    id: string;
    name: string;
    capacity: number;
    location?: string;
    created_at: Date;
}
export declare class Reservation {
    id: string;
    user_id: number;
    room_id: number;
    start_time: Date;
    end_time: Date;
    created_at: Date;
}
export declare class User {
    id: string;
    keycloak_id: string;
    created_at: Date;
    email?: string;
}
export declare class CreateRoomInput {
    name: string;
    capacity: number;
    location?: string;
}
export declare class UpdateRoomInput {
    id: string;
    name?: string;
    capacity?: number;
    location?: string;
}
export declare class CreateReservationInput {
    user_id: number;
    room_id: number;
    start_time: Date;
    end_time: Date;
}
export declare class UpdateReservationInput {
    id: string;
    user_id?: number;
    room_id?: number;
    start_time?: Date;
    end_time?: Date;
}
