"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const user_dto_1 = require("../dto/user.dto");
const class_transformer_1 = require("class-transformer");
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || user.password !== password) {
            throw new common_1.UnauthorizedException('Email ou mot de passe incorrect');
        }
        return user;
    }
    async findAll(skip = 0, limit = 10) {
        const users = await this.userRepository.find({
            skip,
            take: limit,
        });
        return users.map(user => (0, class_transformer_1.plainToClass)(user_dto_1.UserResponseDto, user));
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
        }
        return (0, class_transformer_1.plainToClass)(user_dto_1.UserResponseDto, user);
    }
    async create(createUserDto) {
        const newUser = this.userRepository.create(createUserDto);
        const savedUser = await this.userRepository.save(newUser);
        return (0, class_transformer_1.plainToClass)(user_dto_1.UserResponseDto, savedUser);
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
        }
        Object.assign(user, updateUserDto);
        const updatedUser = await this.userRepository.save(user);
        return (0, class_transformer_1.plainToClass)(user_dto_1.UserResponseDto, updatedUser);
    }
    async remove(id) {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
        }
    }
    async extractUserData(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['reservations', 'reservations.room']
        });
        if (!user) {
            throw new common_1.NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
        }
        return (0, class_transformer_1.plainToClass)(user_dto_1.UserResponseDto, user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map