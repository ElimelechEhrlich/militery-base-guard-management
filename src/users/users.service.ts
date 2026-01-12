import { Injectable, InjectionToken } from '@nestjs/common';


@Injectable()
export class UsersService {
    getMocked(){
        return "users mocked"
    }
}
