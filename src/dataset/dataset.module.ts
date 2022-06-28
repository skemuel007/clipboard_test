import { Module } from '@nestjs/common';
import { DatasetService } from './services/dataset.service';
import { DatasetController } from './controllers/dataset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dataset } from './entities/dataset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dataset])],
  providers: [DatasetService],
  controllers: [DatasetController],
})
export class DatasetModule {}
