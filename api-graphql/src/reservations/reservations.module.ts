import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  exports: [TypeOrmModule],
})
export class ReservationsModule {} 