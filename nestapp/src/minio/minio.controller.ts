import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MinioService } from './minio.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Get(':id/extract')
  async generateUserExtract(@Param('id') userId: string) {
    // TODO: Appeler le service gRPC pour générer le CSV
    const csvContent = 'reservation_id,user_id,room_id,start_time,end_time,status\n1,10,5,2025-06-01T10:00:00Z,2025-06-01T12:00:00Z,approved';
    
    const fileName = this.minioService.generateFileName(parseInt(userId));
    const objectName = await this.minioService.uploadFile(Buffer.from(csvContent), fileName);
    const url = await this.minioService.getPresignedUrl(objectName);

    return { url };
  }
} 