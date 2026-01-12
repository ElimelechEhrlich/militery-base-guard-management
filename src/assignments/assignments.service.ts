import { Injectable } from '@nestjs/common';

@Injectable()
export class AssignmentsService {
    getMocked(){
        return "assignments mocked"
    }
}
