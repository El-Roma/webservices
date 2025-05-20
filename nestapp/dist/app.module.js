"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const rooms_module_1 = require("./rooms/rooms.module");
const reservations_module_1 = require("./reservations/reservations.module");
const notifications_module_1 = require("./notifications/notifications.module");
const auth_module_1 = require("./auth/auth.module");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const resolver_1 = require("./graphql/resolver");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
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
            users_module_1.UsersModule,
            rooms_module_1.RoomsModule,
            auth_module_1.AuthModule,
            reservations_module_1.ReservationsModule,
            notifications_module_1.NotificationsModule,
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: true,
                playground: true,
            }),
        ],
        controllers: [],
        providers: [resolver_1.AppResolver],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map