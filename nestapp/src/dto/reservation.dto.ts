import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({
    description: 'Identifiant de l\'utilisateur',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: 'Identifiant de la salle',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  room_id: number;

  @ApiProperty({
    description: 'Date et heure de début de la réservation (format ISO8601)',
    example: '2023-04-20T14:00:00',
  })
  @IsNotEmpty()
  @IsDateString()
  start_time: string;

  @ApiProperty({
    description: 'Date et heure de fin de la réservation (format ISO8601)',
    example: '2023-04-20T16:00:00',
  })
  @IsNotEmpty()
  @IsDateString()
  end_time: string;
}

export class UpdateReservationDto {
  @ApiProperty({
    description: 'Identifiant de l\'utilisateur',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @ApiProperty({
    description: 'Identifiant de la salle',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  room_id?: number;

  @ApiProperty({
    description: 'Date et heure de début de la réservation (format ISO8601)',
    example: '2023-04-20T14:00:00',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  start_time?: string;

  @ApiProperty({
    description: 'Date et heure de fin de la réservation (format ISO8601)',
    example: '2023-04-20T16:00:00',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  end_time?: string;
}

export class ReservationResponseDto {
  @ApiProperty({
    description: 'Identifiant unique de la réservation',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Identifiant de l\'utilisateur',
    example: 1,
  })
  user_id: number;

  @ApiProperty({
    description: 'Identifiant de la salle',
    example: 2,
  })
  room_id: number;

  @ApiProperty({
    description: 'Date et heure de début de la réservation',
    example: '2023-04-20T14:00:00Z',
  })
  start_time: Date;

  @ApiProperty({
    description: 'Date et heure de fin de la réservation',
    example: '2023-04-20T16:00:00Z',
  })
  end_time: Date;

  @ApiProperty({
    description: 'Date de création de la réservation',
    example: '2023-04-15T10:30:00Z',
  })
  created_at: Date;
} 