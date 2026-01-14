import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ShiftsModule } from './shifts/shifts.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './users/usersDto/validation.pipe';
import { DataSource } from 'typeorm';
import { UserEntity } from './users/usersDto/user.entity';
import { Sequelize } from 'sequelize-typescript';
import { databaseProviders } from './database/database.providers';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';



@Module({
    imports:
        [
            DatabaseModule,
            ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            AuthModule,
            DatabaseModule,
            UsersModule,
            ShiftsModule,
            AssignmentsModule, DatabaseModule
        ],
    controllers: [AppController],
    providers:
        [
            AppService,
            {
                provide: APP_PIPE,
                useClass: ValidationPipe,
            }
        ]
})
export class AppModule {}
