import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dataset } from '../../dataset/entities/dataset.entity';
import { Repository } from 'typeorm';
import { datasets } from './dataset_data';

@Injectable()
export class DatasetSeederService {
  constructor(
    @InjectRepository(Dataset)
    private readonly dataRepository: Repository<Dataset>,
  ) {}

  /**
   * Seed all dataset
   */
  create(): Array<Promise<Dataset>> {
    return datasets.map(async (dataset: Dataset) => {
      return await this.dataRepository
        .findOne({
          where: {
            name: dataset.name,
            department: dataset.department,
            currency: dataset.currency,
            salary: dataset.salary,
          },
        })
        .then(async (dbDataSet) => {
          // check if dbDataSet alread exists
          if (dbDataSet) return Promise.resolve(null);

          return Promise.resolve(await this.dataRepository.save(dataset));
        })
        .catch((error) => Promise.reject());
    });
  }
}
