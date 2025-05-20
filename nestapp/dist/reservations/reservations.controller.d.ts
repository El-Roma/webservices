import { ReservationsService } from './reservations.service';
import { CreateReservationDto, UpdateReservationDto } from '../dto/reservation.dto';
import { PaginationQueryDto } from '../dto/common.dto';
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    findAll(query: PaginationQueryDto): Promise<{
        reservations: import("../entities/reservation.entity").Reservation[];
    }>;
    findOne(id: number): Promise<import("../entities/reservation.entity").Reservation>;
    create(createReservationDto: CreateReservationDto): Promise<import("../entities/reservation.entity").Reservation>;
    update(id: number, updateReservationDto: UpdateReservationDto): Promise<import("../entities/reservation.entity").Reservation>;
    remove(id: number): Promise<void>;
}
