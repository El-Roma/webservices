import { User } from './user.entity';
import { Room } from './room.entity';
export declare class Reservation {
    id: number;
    user: User;
    room: Room;
    start_time: Date;
    end_time: Date;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    created_at: Date;
}
