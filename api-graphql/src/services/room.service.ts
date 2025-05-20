import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../entities/room.entity';
import { CreateRoomInput, UpdateRoomInput } from '../dto/room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async findAll(skip = 0, limit = 10): Promise<Room[]> {
    return this.roomRepository.find({
      skip,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }

  async create(input: CreateRoomInput): Promise<Room> {
    const room = this.roomRepository.create(input);
    return this.roomRepository.save(room);
  }

  async update(id: number, input: UpdateRoomInput): Promise<Room> {
    const room = await this.findOne(id);
    Object.assign(room, input);
    return this.roomRepository.save(room);
  }

  async remove(id: number): Promise<void> {
    const result = await this.roomRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
  }
} 