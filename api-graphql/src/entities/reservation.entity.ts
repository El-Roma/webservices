import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Room } from './room.entity';
import { User } from './user.entity';

@ObjectType()
@Entity({ name: 'reservations' })
export class Reservation {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ID)
  @Column({ name: 'user_id' })
  user_id: number;

  @Field(() => ID)
  @Column({ name: 'room_id' })
  room_id: number;

  @Field()
  @Column({ name: 'start_time' })
  start_time: Date;

  @Field()
  @Column({ name: 'end_time' })
  end_time: Date;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
} 