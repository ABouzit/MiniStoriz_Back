import { Test, TestingModule } from '@nestjs/testing';
import { ImpressionsController } from './impressions.controller';

describe('Impressions Controller', () => {
  let controller: ImpressionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImpressionsController],
    }).compile();

    controller = module.get<ImpressionsController>(ImpressionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
