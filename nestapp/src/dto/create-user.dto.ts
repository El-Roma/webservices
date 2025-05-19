import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'Email de l\'utilisateur' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John', description: 'Prénom de l\'utilisateur' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Nom de l\'utilisateur' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'password123', description: 'Mot de passe de l\'utilisateur' })
  @IsString()
  @MinLength(6)
  password: string;
} 