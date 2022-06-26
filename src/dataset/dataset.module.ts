import { Module } from '@nestjs/common';
import { DatasetService } from './service/dataset/dataset.service';
import { DatasetService } from './service/dataset.service';
import { DatasetController } from './dataset.controller';

@Module({
  providers: [DatasetService],
  controllers: [DatasetController]
})
export class DatasetModule {}
