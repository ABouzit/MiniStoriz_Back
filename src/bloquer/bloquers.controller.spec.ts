import { Test, TestingModule } from '@nestjs/testing';
import { BloquersController } from './bloquers.controller';

describe('Relation Controller', () => {
  let controller: BloquersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloquersController],
    }).compile();

    controller = module.get<BloquersController>(BloquersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
