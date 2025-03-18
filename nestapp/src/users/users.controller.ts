import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto, LoginResponseDto, PaginatedUsersResponseDto, UserResponseDto } from '../dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { KeycloakAuthGuard } from '../auth/keycloak-auth.guard';
import { PaginationQueryDto } from '../dto/common.dto';

@ApiTags('users')
@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ summary: 'Authentifier un utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Authentification réussie',
    type: LoginResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.usersService.login(loginDto);
  }

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
}
