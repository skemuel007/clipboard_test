import { Module } from '@nestjs/common';
import { DatasetService } from './service/dataset.service';
import { DatasetController } from './dataset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dataset } from './dataset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dataset])],
  providers: [DatasetService],
  controllers: [DatasetController],
})
export class DatasetModule {}
