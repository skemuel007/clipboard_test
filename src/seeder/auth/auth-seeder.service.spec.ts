import { Test, TestingModule } from '@nestjs/testing';
import { AuthSeederService } from './auth-seeder.service';

describe('AuthService', () => {
  let service: AuthSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthSeederService],
    }).compile();

    service = module.get<AuthSeederService>(AuthSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
