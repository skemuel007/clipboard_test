import { Logger, Module } from "@nestjs/common";
import { DatasetSeederService } from './dataset-seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dataset } from '../../dataset/dataset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dataset])],
  providers: [DatasetSeederService, Logger],
  exports: [DatasetSeederService],
})
export class DatasetSeederModule {}
