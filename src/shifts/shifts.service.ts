import { Injectable } from '@nestjs/common';

@Injectable()
export class ShiftsService {
    getMocked(){
        return "shifts mocked"
    }
}
