import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserResponseDto, CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(skip = 0, limit = 10): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find({
      skip,
      take: limit,
    });
    return users.map(user => plainToClass(UserResponseDto, user));
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    return plainToClass(UserResponseDto, user);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
  }

  async extractUserData(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ 
      where: { id },
      relations: ['reservations', 'reservations.room']
    });
    
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }

    return plainToClass(UserResponseDto, user);
  }
}
