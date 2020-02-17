import { Test, TestingModule } from '@nestjs/testing';
import { ImpressionsService } from './impressions.service';

describe('ImpressionsService', () => {
  let service: ImpressionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImpressionsService],
    }).compile();

    service = module.get<ImpressionsService>(ImpressionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
