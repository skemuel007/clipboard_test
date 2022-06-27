import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dataset } from '../dataset.entity';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateDatasetDto } from '../dto/create-dataset.dto';
import { SalarySsResponseDto } from '../dto/salary-ss-response.dto';

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

  async salarySummaryStatistics(): Promise<SalarySsResponseDto> {
    const salarySummaryStats =
      await this.summaryStatisticsSQLQuery().getRawOne();
    const summaryResponse: SalarySsResponseDto = {
      ...salarySummaryStats,
    };
    return summaryResponse;
  }

  async deleteDataSet(id: number): Promise<any> {
    const deletedResponse = await this.dataSetRepository.delete(id);
    if (deletedResponse.affected > 0) return deletedResponse;
    else throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
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
