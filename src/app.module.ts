import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ShiftsModule } from './shifts/shifts.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ConfigModule } from '@nestjs/config';
import { UsersDbModule } from './users-db/users-db.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, 
            envFilePath: '.env',
        }),
        AuthModule, 
        UsersDbModule, 
        ShiftsModule, 
        AssignmentsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
