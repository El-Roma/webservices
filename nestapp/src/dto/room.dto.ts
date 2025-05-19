import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Nom de la salle',
    example: 'Salle de conférence A',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Capacité de la salle',
    example: 20,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  capacity: number;

  @ApiProperty({
    description: 'Emplacement de la salle',
    example: 'Bâtiment C, 2ème étage',
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;
}

export class UpdateRoomDto {
  @ApiProperty({
    description: 'Nom de la salle',
    example: 'Salle de conférence A',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Capacité de la salle',
    example: 20,
    minimum: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  capacity?: number;

  @ApiProperty({
    description: 'Emplacement de la salle',
    example: 'Bâtiment C, 2ème étage',
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;
}

export class RoomResponseDto {
  @ApiProperty({
    description: 'Identifiant unique de la salle',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nom de la salle',
    example: 'Salle de conférence A',
  })
  name: string;

  @ApiProperty({
    description: 'Capacité de la salle',
    example: 20,
  })
  capacity: number;

  @ApiProperty({
    description: 'Emplacement de la salle',
    example: 'Bâtiment C, 2ème étage',
  })
  location: string;

  @ApiProperty({
    description: 'Date de création',
    example: '2023-01-15T14:30:00Z',
  })
  created_at: Date;
} 