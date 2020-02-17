import { Test, TestingModule } from '@nestjs/testing';
import { PlanchesService } from './planches.service';

describe('PlanchesService', () => {
  let service: PlanchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanchesService],
    }).compile();

    service = module.get<PlanchesService>(PlanchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
