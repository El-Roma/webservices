import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
