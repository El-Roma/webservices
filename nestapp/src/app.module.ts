import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { ReservationsModule } from './reservations/reservations.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from "./auth/auth.module";
import { MinioModule } from './minio/minio.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'pguser',
      password: 'pgpass',
      database: 'pgdb',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    RoomsModule,
    AuthModule,
    ReservationsModule,
    NotificationsModule,
    MinioModule,
  ],
})
export class AppModule {}
