import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { CreateReservationDto, UpdateReservationDto } from '../dto/reservation.dto';
import { UsersService } from '@/users/users.service';
import { RoomsService } from '@/rooms/rooms.service';
export declare class ReservationsService {
    private reservationRepository;
    private usersService;
    private roomsService;
    constructor(reservationRepository: Repository<Reservation>, usersService: UsersService, roomsService: RoomsService);
    findAll(skip?: number, limit?: number): Promise<Reservation[]>;
    findOne(id: number): Promise<Reservation>;
    create(createReservationDto: CreateReservationDto): Promise<Reservation>;
    update(id: number, updateReservationDto: UpdateReservationDto): Promise<Reservation>;
    remove(id: number): Promise<void>;
}
