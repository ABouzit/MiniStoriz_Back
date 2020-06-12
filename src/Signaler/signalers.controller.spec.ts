import { Test, TestingModule } from '@nestjs/testing';
import { SignalersController } from './signalers.controller';

describe('Relation Controller', () => {
  let controller: SignalersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignalersController],
    }).compile();

    controller = module.get<SignalersController>(SignalersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
