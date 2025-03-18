import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto, RoomResponseDto, UpdateRoomDto } from '../dto/room.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { KeycloakAuthGuard } from '../auth/keycloak-auth.guard';
import { PaginationQueryDto } from '../dto/common.dto';

@ApiTags('rooms')
@ApiBearerAuth('JWT-auth')
@Controller('api/rooms')
@UseGuards(KeycloakAuthGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer la liste des salles' })
  @ApiResponse({
    status: 200,
    description: 'Liste de salles récupérée avec succès',
    schema: {
      type: 'object',
      properties: {
        rooms: {
          type: 'array',
          items: { $ref: '#/components/schemas/RoomResponseDto' },
        },
      },
    },
  })
  async findAll(@Query() query: PaginationQueryDto) {
    const rooms = await this.roomsService.findAll(query.skip, query.limit);
    return { rooms };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une salle par son ID' })
  @ApiResponse({
    status: 200,
    description: 'Salle récupérée avec succès',
    type: RoomResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Salle non trouvée',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle salle' })
  @ApiResponse({
    status: 201,
    description: 'Salle créée avec succès',
    type: RoomResponseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une salle' })
  @ApiResponse({
    status: 200,
    description: 'Salle mise à jour avec succès',
    type: RoomResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Salle non trouvée',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une salle' })
  @ApiResponse({
    status: 204,
    description: 'Salle supprimée avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Salle non trouvée',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.roomsService.remove(id);
  }
}
