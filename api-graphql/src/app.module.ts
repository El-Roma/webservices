import { Module, Logger, Controller, Get, Req, Res } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { ReservationsModule } from './reservations/reservations.module';
import { Room } from './entities/room.entity';
import { Reservation } from './entities/reservation.entity';
import { User } from './entities/user.entity';
import { RoomResolver } from './resolvers/room.resolver';
import { ReservationResolver } from './resolvers/reservation.resolver';
import { RoomService } from './services/room.service';
import { ReservationService } from './services/reservation.service';
import { UserService } from './services/user.service';
import { Request, Response } from 'express';

@Controller('api')
export class ApiUsersController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getUsers(@Req() req: Request, @Res() res: Response) {
    return res.json({
      users: [
        {
          id: '1',
          name: 'User Test',
          email: 'user@test.com',
          created_at: new Date().toISOString()
        }
      ]
    });
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
        numberScalarMode: 'integer',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || process.env.DB_DATABASE || 'reservations',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: ['error'],
    }),
    AuthModule,
    UsersModule,
    RoomsModule,
    ReservationsModule,
    TypeOrmModule.forFeature([Room, Reservation, User]),
  ],
  controllers: [ApiUsersController],
  providers: [
    RoomResolver,
    ReservationResolver,
    RoomService,
    ReservationService,
    UserService,
    Logger,
  ],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    this.logger.log('Database configuration:');
    this.logger.log(`Host: ${process.env.DB_HOST || 'localhost'}`);
    this.logger.log(`Port: ${process.env.DB_PORT || '5432'}`);
    this.logger.log(`Database: ${process.env.DB_NAME || process.env.DB_DATABASE || 'reservations'}`);
    this.logger.log(`Keycloak URL: ${process.env.KEYCLOAK_URL || 'http://keycloak:8080'}`);
  }
}
