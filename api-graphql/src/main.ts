import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Logger } from '@nestjs/common';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  
  app.useGlobalPipes(new ValidationPipe());
  
  const port = process.env.PORT || 3000;
  
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}/`);
  logger.log(`GraphQL Playground available at: http://localhost:${port}/graphql`);
}
bootstrap();
