import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dataset } from '../dataset.entity';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateDatasetDto } from '../dto/create-dataset.dto';

@Injectable()
export class DatasetService {
  constructor(
    @InjectRepository(Dataset)
    private dataSetRepository: Repository<Dataset>,
  ) {}

  async getAllDataSets(): Promise<Dataset[]> {
    return await this.dataSetRepository.find();
  }

  async createDataSet(dataset: CreateDatasetDto): Promise<Dataset> {
    const newDataSet = this.dataSetRepository.create(dataset);
    return await this.dataSetRepository.save<Dataset>(newDataSet);
  }

  async salarySummaryStatistics(): Promise<any> {
    return await this.summaryStatisticsSQLQuery().getRawOne();
  }

  async deleteDataSet(id: number): Promise<DeleteResult> {
    return await this.dataSetRepository.delete(id);
  }

  async getContractSalarySummaryStatistics(): Promise<any> {
    return await this.summaryStatisticsSQLQuery()
      .addSelect('dataset.on_contract', 'on_contract')
      .groupBy('dataset.on_contract')
      .where('dataset.on_contract = :value', { value: true })
      .getRawMany();
  }

  async salarySummaryStatisticsByDepartment(): Promise<any> {
    return await this.summaryStatisticsSQLQuery()
      .addSelect('department', 'department')
      .groupBy('dataset.department')
      .getRawMany();
  }

  async salarySummaryStatisticsByDepartmentAndSubDept(): Promise<any> {
    return await this.summaryStatisticsSQLQuery()
      .addSelect('department', 'department')
      .addSelect('sub_department', 'sub_department')
      .groupBy('dataset.department')
      .addGroupBy('dataset.sub_department')
      .getRawMany();
  }

  private summaryStatisticsSQLQuery(): SelectQueryBuilder<Dataset> {
    return this.dataSetRepository
      .createQueryBuilder('dataset')
      .select('MAX(dataset.salary)', 'max_salary')
      .addSelect('SUM(dataset.salary)/COUNT(dataset.salary)', 'mean_salary')
      .addSelect('MIN(dataset.salary)', 'min_salary');
  }
}
