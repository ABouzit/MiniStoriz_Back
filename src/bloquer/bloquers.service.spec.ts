import { Test, TestingModule } from '@nestjs/testing';
import { BloquersService } from './bloquers.service';

describe('RelationService', () => {
  let service: BloquersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloquersService],
    }).compile();

    service = module.get<BloquersService>(BloquersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
