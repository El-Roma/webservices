export declare class CreateUserDto {
    email: string;
    password: string;
}
export declare class UpdateUserDto {
    email?: string;
    password?: string;
}
export declare class UserResponseDto {
    id: number;
    email: string;
    created_at: Date;
}
export declare class PaginatedUsersResponseDto {
    users: UserResponseDto[];
}
