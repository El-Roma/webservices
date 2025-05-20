import { Reservation } from './reservation.entity';
export declare class User {
    id: number;
    email?: string;
    password: string;
    reservations: Reservation[];
    created_at: Date;
}
