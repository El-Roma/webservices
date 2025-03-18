import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginatedUsersResponseDto, UserResponseDto, CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { KeycloakAuthGuard } from '../auth/keycloak-auth.guard';
import { PaginationQueryDto } from '../dto/common.dto';

@ApiTags('users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  @ApiOperation({ summary: 'Récupérer la liste des utilisateurs' })
  @ApiResponse({
    status: 200,
    description: 'Liste d\'utilisateurs récupérée avec succès',
    type: PaginatedUsersResponseDto,
  })
  @UseGuards(KeycloakAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async findAll(@Query() query: PaginationQueryDto): Promise<PaginatedUsersResponseDto> {
    const users = await this.usersService.findAll(query.skip, query.limit);
    return { users };
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par son ID' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur récupéré avec succès',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Utilisateur non trouvé',
  })
  @UseGuards(KeycloakAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post('users')
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({
    status: 201,
    description: 'Utilisateur créé avec succès',
    type: UserResponseDto,
  })
  @UseGuards(KeycloakAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put('users/:id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur mis à jour avec succès',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Utilisateur non trouvé',
  })
  @UseGuards(KeycloakAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiResponse({
    status: 204,
    description: 'Utilisateur supprimé avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Utilisateur non trouvé',
  })
  @UseGuards(KeycloakAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
  }

  @Get('users/:id/extract')
  @ApiOperation({ summary: 'Extraire les données d\'un utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Données de l\'utilisateur extraites avec succès',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Utilisateur non trouvé',
  })
  @UseGuards(KeycloakAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async extractUserData(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.extractUserData(id);
  }
}
