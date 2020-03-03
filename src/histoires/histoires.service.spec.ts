import { Test, TestingModule } from '@nestjs/testing';
import { HistoiresService } from './histoires.service';

describe('HistoiresService', () => {
  let service: HistoiresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoiresService],
    }).compile();

    service = module.get<HistoiresService>(HistoiresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
