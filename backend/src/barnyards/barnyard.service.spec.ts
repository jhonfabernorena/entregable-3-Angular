import { Test, TestingModule } from '@nestjs/testing';
import { barnyardsService } from './barnyard.service';

describe('barnyardsService', () => {
  let service: barnyardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [barnyardsService],
    }).compile();

    service = module.get<barnyardsService>(barnyardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
