import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MinioService {
  private client: Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.bucketName = 'reservations-csv';
    this.client = new Client({
      endPoint: this.configService.get('MINIO_ENDPOINT') || 'localhost',
      port: parseInt(this.configService.get('MINIO_PORT') || '9000'),
      useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get('MINIO_ACCESS_KEY') || 'minioadmin',
      secretKey: this.configService.get('MINIO_SECRET_KEY') || 'minioadmin',
    });
  }

  generateFileName(userId: number): string {
    return `user_${userId}_${Date.now()}.csv`;
  }

  async uploadFile(file: Buffer, fileName: string): Promise<string> {
    const objectName = `extracts/${fileName}`;
    await this.client.putObject(this.bucketName, objectName, file);
    return objectName;
  }

  async getPresignedUrl(objectName: string): Promise<string> {
    return await this.client.presignedGetObject(this.bucketName, objectName, 5 * 60); // 5 minutes
  }

  getClient(): Client {
    return this.client;
  }
} 