import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCardService } from './shopping-card.service';

describe('ShoppingCardService', () => {
  let service: ShoppingCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingCardService],
    }).compile();

    service = module.get<ShoppingCardService>(ShoppingCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
