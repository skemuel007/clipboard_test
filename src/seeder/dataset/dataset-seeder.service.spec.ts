import { Test, TestingModule } from '@nestjs/testing';
import { DatasetSeederService } from './dataset-seeder.service';

describe('DatasetService', () => {
  let service: DatasetSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatasetSeederService],
    }).compile();

    service = module.get<DatasetSeederService>(DatasetSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
