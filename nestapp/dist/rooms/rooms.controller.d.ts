import { RoomsService } from './rooms.service';
import { CreateRoomDto, UpdateRoomDto } from '@/dto/room.dto';
import { PaginationQueryDto } from '@/dto/common.dto';
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    findAll(query: PaginationQueryDto): Promise<{
        rooms: import("../entities/room.entity").Room[];
    }>;
    findOne(id: number): Promise<import("../entities/room.entity").Room>;
    create(createRoomDto: CreateRoomDto): Promise<import("../entities/room.entity").Room>;
    update(id: number, updateRoomDto: UpdateRoomDto): Promise<import("../entities/room.entity").Room>;
    remove(id: number): Promise<void>;
}
