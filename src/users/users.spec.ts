import { Test, TestingModule } from '@nestjs/testing';
import { UsersProviders } from './users.providers';
import { UserEntity } from './usersDto/user.entity';

describe('Users', () => {
  let provider = UsersProviders
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...UsersProviders],
    }).compile();

    provider = UsersProviders.map(UsersProvider => module.get<typeof UsersProvider>(typeof UsersProvider));
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
