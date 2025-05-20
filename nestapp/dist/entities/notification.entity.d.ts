import { Reservation } from './reservation.entity';
export declare class Notification {
    id: number;
    reservation: Reservation;
    message: string;
    notification_date: Date;
    is_sent: boolean;
}
