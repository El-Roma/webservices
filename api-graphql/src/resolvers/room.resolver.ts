import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { Room } from '../entities/room.entity';
import { RoomService } from '../services/room.service';

@Resolver(() => Room)
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Query(() => [Room])
  async rooms(
    @Args('skip', { nullable: true, type: () => Int }) skip?: number,
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
  ): Promise<Room[]> {
    return this.roomService.findAll(skip, limit);
  }

  @Query(() => [Room])
  async listRooms(
    @Args('skip', { nullable: true, type: () => Int }) skip?: number,
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
  ): Promise<Room[]> {
    return this.roomService.findAll(skip, limit);
  }

  @Query(() => Room, { nullable: true })
  async room(@Args('id', { type: () => ID }) id: number): Promise<Room> {
    try {
      return await this.roomService.findOne(id);
    } catch (error) {
      return null;
    }
  }

  @Mutation(() => Room)
  async createRoom(
    @Args('name') name: string,
    @Args('capacity', { type: () => Int }) capacity: number,
    @Args('location', { nullable: true }) location?: string,
  ): Promise<Room> {
    return this.roomService.create({
      name,
      capacity,
      location,
    });
  }

  @Mutation(() => Room)
  async updateRoom(
    @Args('id', { type: () => ID }) id: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('capacity', { type: () => Int, nullable: true }) capacity?: number,
    @Args('location', { nullable: true }) location?: string,
  ): Promise<Room> {
    return this.roomService.update(id, {
      name,
      capacity,
      location,
    });
  }

  @Mutation(() => Boolean)
  async deleteRoom(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    try {
      await this.roomService.remove(id);
      return true;
    } catch (error) {
      return true;
    }
  }
} 