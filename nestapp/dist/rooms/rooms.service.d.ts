import { Repository } from 'typeorm';
import { Room } from '../entities/room.entity';
import { CreateRoomDto, UpdateRoomDto } from '../dto/room.dto';
export declare class RoomsService {
    private roomRepository;
    constructor(roomRepository: Repository<Room>);
    findAll(skip?: number, limit?: number): Promise<Room[]>;
    findOne(id: number): Promise<Room>;
    create(createRoomDto: CreateRoomDto): Promise<Room>;
    update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room>;
    remove(id: number): Promise<void>;
}
