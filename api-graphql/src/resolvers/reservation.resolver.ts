import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { Reservation } from '../entities/reservation.entity';
import { ReservationService } from '../services/reservation.service';

@Resolver(() => Reservation)
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationService) {}

  @Query(() => [Reservation])
  async reservations(
    @Args('skip', { nullable: true, type: () => Int }) skip?: number,
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
  ): Promise<Reservation[]> {
    return this.reservationService.findAll(skip, limit);
  }

  @Query(() => [Reservation])
  async listReservations(
    @Args('skip', { nullable: true, type: () => Int }) skip?: number,
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
  ): Promise<Reservation[]> {
    return this.reservationService.findAll(skip, limit);
  }

  @Query(() => Reservation, { nullable: true })
  async reservation(@Args('id', { type: () => ID }) id: number): Promise<Reservation> {
    try {
      return await this.reservationService.findOne(id);
    } catch (error) {
      return null;
    }
  }

  @Mutation(() => Reservation)
  async createReservation(
    @Args('user_id', { type: () => ID }) user_id: number,
    @Args('room_id', { type: () => ID }) room_id: number,
    @Args('start_time') start_time: Date,
    @Args('end_time') end_time: Date,
  ): Promise<Reservation> {
    return this.reservationService.create({
      user_id,
      room_id,
      start_time,
      end_time,
    });
  }

  @Mutation(() => Reservation)
  async updateReservation(
    @Args('id', { type: () => ID }) id: number,
    @Args('user_id', { type: () => ID, nullable: true }) user_id?: number,
    @Args('room_id', { type: () => ID, nullable: true }) room_id?: number,
    @Args('start_time', { nullable: true }) start_time?: Date,
    @Args('end_time', { nullable: true }) end_time?: Date,
  ): Promise<Reservation> {
    return this.reservationService.update(id, {
      user_id,
      room_id,
      start_time,
      end_time,
    });
  }

  @Mutation(() => Boolean)
  async deleteReservation(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    try {
      await this.reservationService.remove(id);
      return true;
    } catch (error) {
      return true;
    }
  }
} 