import { Test, TestingModule } from '@nestjs/testing';
import { PlanchesController } from './planches.controller';

describe('Planches Controller', () => {
  let controller: PlanchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanchesController],
    }).compile();

    controller = module.get<PlanchesController>(PlanchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
