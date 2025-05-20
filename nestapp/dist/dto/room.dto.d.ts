export declare class CreateRoomDto {
    name: string;
    capacity: number;
    location?: string;
}
export declare class UpdateRoomDto {
    name?: string;
    capacity?: number;
    location?: string;
}
export declare class RoomResponseDto {
    id: number;
    name: string;
    capacity: number;
    location?: string;
    created_at: Date;
}
