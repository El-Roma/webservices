import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../entities/room.entity';
import { CreateRoomDto, UpdateRoomDto } from '../dto/room.dto';

@Injectable()
export class RoomsService {
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
      throw new NotFoundException(`Salle avec l'ID ${id} non trouvée`);
    }
    return room;
  }

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = this.roomRepository.create(createRoomDto);
    return this.roomRepository.save(room);
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.findOne(id);
    
    // Mettre à jour les propriétés
    if (updateRoomDto.name !== undefined) {
      room.name = updateRoomDto.name;
    }
    if (updateRoomDto.capacity !== undefined) {
      room.capacity = updateRoomDto.capacity;
    }
    if (updateRoomDto.location !== undefined) {
      room.location = updateRoomDto.location;
    }
    
    return this.roomRepository.save(room);
  }

  async remove(id: number): Promise<void> {
    const result = await this.roomRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Salle avec l'ID ${id} non trouvée`);
    }
  }
}
