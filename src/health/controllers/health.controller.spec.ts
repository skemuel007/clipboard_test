import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import {
  DiskHealthIndicator,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

describe('HealthController', () => {
  let healthController: HealthController;
  let healthCheckServiceSpy: HealthCheckService;
  let healthHttpIndicatorSpy: HttpHealthIndicator;
  let typeOrmHealthIndicatorSpy: TypeOrmHealthIndicator;
  let memoryHealthIndicatorSpy: MemoryHealthIndicator;
  let diskHealthIndicatorSpy: DiskHealthIndicator;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        HealthCheckService,
        HttpHealthIndicator,
        TypeOrmHealthIndicator,
        MemoryHealthIndicator,
        DiskHealthIndicator,
      ],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
    healthCheckServiceSpy = app.get<HealthCheckService>(HealthCheckService);
    healthHttpIndicatorSpy = app.get<HttpHealthIndicator>(HttpHealthIndicator);
    typeOrmHealthIndicatorSpy = app.get<TypeOrmHealthIndicator>(
      TypeOrmHealthIndicator,
    );
    memoryHealthIndicatorSpy = app.get<MemoryHealthIndicator>(
      MemoryHealthIndicator,
    );
    diskHealthIndicatorSpy = app.get<DiskHealthIndicator>(DiskHealthIndicator);
  });

  it('should be defined', () => {
    expect(healthController).toBeDefined();
  });

  it('calling check method', () => {
    expect(healthController.check).toHaveBeenCalled();
  });
});
