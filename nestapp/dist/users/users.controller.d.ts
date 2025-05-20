import { UsersService } from './users.service';
import { PaginatedUsersResponseDto, UserResponseDto, CreateUserDto, UpdateUserDto } from '@/dto/user.dto';
import { PaginationQueryDto } from '@/dto/common.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(query: PaginationQueryDto): Promise<PaginatedUsersResponseDto>;
    findOne(id: number): Promise<UserResponseDto>;
    create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    remove(id: number): Promise<void>;
    extractUserData(id: number): Promise<UserResponseDto>;
}
