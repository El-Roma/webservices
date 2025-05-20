import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { CreateReservationInput, UpdateReservationInput } from '../dto/reservation.dto';
import { RoomService } from './room.service';
import { UserService } from './user.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private roomService: RoomService,
    private userService: UserService,
  ) {}

  async findAll(skip = 0, limit = 10): Promise<Reservation[]> {
    return this.reservationRepository.find({
      skip,
      take: limit,
      relations: ['user', 'room'],
    });
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['user', 'room'],
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  async create(input: CreateReservationInput): Promise<Reservation> {
    await this.userService.findOne(input.user_id);

    await this.roomService.findOne(input.room_id);

    if (input.end_time <= input.start_time) {
      throw new BadRequestException('End time must be after start time');
    }

    const conflictingReservation = await this.reservationRepository.findOne({
      where: {
        room_id: input.room_id,
        start_time: input.start_time,
        end_time: input.end_time,
      },
    });

    if (conflictingReservation) {
      throw new BadRequestException('Room is already reserved for this time slot');
    }

    const reservation = this.reservationRepository.create(input);
    return this.reservationRepository.save(reservation);
  }

  async update(id: number, input: UpdateReservationInput): Promise<Reservation> {
    const reservation = await this.findOne(id);

    if (input.user_id) {
      await this.userService.findOne(input.user_id);
      reservation.user_id = input.user_id;
    }

    if (input.room_id) {
      await this.roomService.findOne(input.room_id);
      reservation.room_id = input.room_id;
    }

    if (input.start_time) {
      reservation.start_time = input.start_time;
    }

    if (input.end_time) {
      reservation.end_time = input.end_time;
    }

    if (reservation.end_time <= reservation.start_time) {
      throw new BadRequestException('End time must be after start time');
    }

    return this.reservationRepository.save(reservation);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reservationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
  }
} 