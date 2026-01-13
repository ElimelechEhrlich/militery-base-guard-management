import { Test, TestingModule } from '@nestjs/testing';
import { UsersDbController } from './users-db.controller';

describe('UsersDbController', () => {
  let controller: UsersDbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersDbController],
    }).compile();

    controller = module.get<UsersDbController>(UsersDbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
