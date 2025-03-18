import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { CreateReservationDto, UpdateReservationDto } from '../dto/reservation.dto';
import { UsersService } from '../users/users.service';
import { RoomsService } from '../rooms/rooms.service';
import { User } from '../entities/user.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private usersService: UsersService,
    private roomsService: RoomsService,
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
      throw new NotFoundException(`Réservation avec l'ID ${id} non trouvée`);
    }
    
    return reservation;
  }

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    // Vérifier que l'utilisateur existe
    const user = await this.usersService.findOne(createReservationDto.user_id);
    
    // Vérifier que la salle existe
    const room = await this.roomsService.findOne(createReservationDto.room_id);
    
    // Vérifier que les dates sont valides
    const startTime = new Date(createReservationDto.start_time);
    const endTime = new Date(createReservationDto.end_time);
    
    if (endTime <= startTime) {
      throw new BadRequestException('La date de fin doit être postérieure à la date de début');
    }
    
    // Vérifier qu'il n'y a pas de conflit de réservation pour cette salle
    const conflictingReservation = await this.reservationRepository.findOne({
      where: {
        room: { id: room.id },
        status: 'approved',
        start_time: startTime,
        end_time: endTime,
      },
    });
    
    if (conflictingReservation) {
      throw new BadRequestException('Cette salle est déjà réservée pour ce créneau horaire');
    }
    
    // Créer la réservation
    const reservation = this.reservationRepository.create({
      user,
      room,
      start_time: startTime,
      end_time: endTime,
      status: 'pending',
    });
    
    return this.reservationRepository.save(reservation);
  }

  async update(id: number, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.findOne(id);
    
    // Mettre à jour l'utilisateur si nécessaire
    if (updateReservationDto.user_id !== undefined) {
      const user = await this.usersService.findOne(updateReservationDto.user_id) as User;
      reservation.user = user;
    }
    
    // Mettre à jour la salle si nécessaire
    if (updateReservationDto.room_id !== undefined) {
      const room = await this.roomsService.findOne(updateReservationDto.room_id);
      reservation.room = room;
    }
    
    // Mettre à jour les dates si nécessaire
    if (updateReservationDto.start_time !== undefined) {
      reservation.start_time = new Date(updateReservationDto.start_time);
    }
    
    if (updateReservationDto.end_time !== undefined) {
      reservation.end_time = new Date(updateReservationDto.end_time);
    }
    
    // Vérifier que les dates sont valides
    if (reservation.end_time <= reservation.start_time) {
      throw new BadRequestException('La date de fin doit être postérieure à la date de début');
    }
    
    return this.reservationRepository.save(reservation);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reservationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Réservation avec l'ID ${id} non trouvée`);
    }
  }
}
