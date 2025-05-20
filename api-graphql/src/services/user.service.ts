import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(skip = 0, limit = 10): Promise<User[]> {
    return this.userRepository.find({
      skip,
      take: limit,
    });
  }

  async findOne(id: string | number): Promise<User> {
    let user: User;
    
    if (typeof id === 'number') {
      user = await this.userRepository.findOne({ where: { id } });
    } else {
      user = await this.userRepository.findOne({ where: { keycloakId: id } });
    }
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async createUserIfNotExists(id: number): Promise<User> {
    try {
      return await this.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        const user = this.userRepository.create({
          id,
          keycloakId: `test-user-${id}`,
          email: `test-user-${id}@example.com`,
        });
        return this.userRepository.save(user);
      }
      throw error;
    }
  }
} 