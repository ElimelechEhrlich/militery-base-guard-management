import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
    constructor(private readonly configService: ConfigService) {}

    getJwtSecret(): string | undefined {
        const jwtSecret = process.env.JWT_SECRET;
        return jwtSecret;
    }
    getHello(): string {
        return 'Hello World!';
    }
}
