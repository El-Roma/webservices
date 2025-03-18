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
import { ReservationsService } from './reservations.service';
import { CreateReservationDto, ReservationResponseDto, UpdateReservationDto } from '../dto/reservation.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { KeycloakAuthGuard } from '../auth/keycloak-auth.guard';
import { PaginationQueryDto } from '../dto/common.dto';

@ApiTags('reservations')
@ApiBearerAuth('JWT-auth')
@Controller('api/reservations')
@UseGuards(KeycloakAuthGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer la liste des réservations' })
  @ApiResponse({
    status: 200,
    description: 'Liste de réservations récupérée avec succès',
    schema: {
      type: 'object',
      properties: {
        reservations: {
          type: 'array',
          items: { $ref: '#/components/schemas/ReservationResponseDto' },
        },
      },
    },
  })
  async findAll(@Query() query: PaginationQueryDto) {
    const reservations = await this.reservationsService.findAll(query.skip, query.limit);
    return { reservations };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une réservation par son ID' })
  @ApiResponse({
    status: 200,
    description: 'Réservation récupérée avec succès',
    type: ReservationResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Réservation non trouvée',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle réservation' })
  @ApiResponse({
    status: 201,
    description: 'Réservation créée avec succès',
    type: ReservationResponseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une réservation' })
  @ApiResponse({
    status: 200,
    description: 'Réservation mise à jour avec succès',
    type: ReservationResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Réservation non trouvée',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une réservation' })
  @ApiResponse({
    status: 204,
    description: 'Réservation supprimée avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Réservation non trouvée',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.reservationsService.remove(id);
  }
}
