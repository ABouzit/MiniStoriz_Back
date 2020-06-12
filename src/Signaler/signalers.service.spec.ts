import { Test, TestingModule } from '@nestjs/testing';
import { SignalersService } from './signalers.service';

describe('SignalerService', () => {
  let service: SignalersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignalersService],
    }).compile();

    service = module.get<SignalersService>(SignalersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
