export declare class CreateReservationDto {
    user_id: number;
    room_id: number;
    start_time: Date;
    end_time: Date;
}
export declare class UpdateReservationDto {
    user_id?: number;
    room_id?: number;
    start_time?: Date;
    end_time?: Date;
}
export declare class ReservationResponseDto {
    id: number;
    user_id: number;
    room_id: number;
    start_time: Date;
    end_time: Date;
    created_at: Date;
}
