import { CanActivate, ExecutionContext, Headers, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly authService:AuthService){}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.authService.verifyUser(request.headers.cookie)
        if (token) {
            if (token.role === "commander") {
                return true
            }
        } return false 
    }
  }

