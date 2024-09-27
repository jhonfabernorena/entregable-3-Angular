import { Test, TestingModule } from '@nestjs/testing';
import { barnyardsController } from './barnyard.controller';
import { barnyardsService } from './barnyard.service';

describe('barnyardsController', () => {
  let controller: barnyardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [barnyardsController],
      providers: [barnyardsService],
    }).compile();

    controller = module.get<barnyardsController>(barnyardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
