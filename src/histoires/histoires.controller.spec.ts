import { Test, TestingModule } from '@nestjs/testing';
import { HistoiresController } from './histoires.controller';

describe('Histoires Controller', () => {
  let controller: HistoiresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoiresController],
    }).compile();

    controller = module.get<HistoiresController>(HistoiresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
