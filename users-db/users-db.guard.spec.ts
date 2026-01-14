import { AuthService } from 'src/auth/auth.service';
import { UsersDbGuard } from './users-db.guard';
import { UsersDbService } from './users-db.service';
import { JwtService } from '@nestjs/jwt';

describe('UsersDbGuard', () => {
  it('should be defined', () => {
    expect(new UsersDbGuard(new AuthService(new UsersDbService(), new JwtService))).toBeDefined();
  });
});
