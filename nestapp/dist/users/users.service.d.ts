import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserResponseDto, CreateUserDto, UpdateUserDto } from '@/dto/user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    validateUser(email: string, password: string): Promise<User>;
    findAll(skip?: number, limit?: number): Promise<UserResponseDto[]>;
    findOne(id: number): Promise<UserResponseDto>;
    create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    remove(id: number): Promise<void>;
    extractUserData(id: number): Promise<UserResponseDto>;
}
