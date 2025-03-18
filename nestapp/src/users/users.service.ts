import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto, UserResponseDto } from '../dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
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

  async createUser(keycloak_id: string, email?: string): Promise<User> {
    const newUser = this.userRepository.create({ keycloak_id, email });
    return this.userRepository.save(newUser);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    // Vérifier les identifiants avec Keycloak
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // Générer le token JWT
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
