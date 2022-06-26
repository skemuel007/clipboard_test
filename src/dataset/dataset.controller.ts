import { Controller, Delete, Get } from '@nestjs/common';
import { DatasetService } from './service/dataset.service';
import { Dataset } from './dataset.entity';
import { DeleteResult } from 'typeorm';

@Controller('dataset')
export class DatasetController {
  constructor(private datasetService: DatasetService) {}

  @Get()
  async GetAllDataSets(): Promise<Dataset[]> {
    return this.datasetService.getAllDataSets();
  }

  @Delete(':id')
  async removeDataset(id: string): Promise<DeleteResult> {
    return await this.datasetService.deleteDataSet(Number(id));
  }

  @Get('ss_salary')
  async getDataSetSummaryStatistics(): Promise<any> {
    return await this.datasetService.salarySummaryStatistics();
  }

  @Get('ss_salary_contract')
  async getSummaryStatisticsForSalaryByContract(): Promise<any> {
    return await this.datasetService.getContractSalarySummaryStatistics();
  }

  @Get('ss_salary_department')
  async getSummaryStatisticsForSalaryByDepartment(): Promise<any> {
    return await this.datasetService.salarySummaryStatisticsByDepartment();
  }

  @Get('ss_salary_department_and_sub_dept')
  async getSummaryStatisticsForSalaryByDepartmentAndSubDept(): Promise<any> {
    return await this.datasetService.salarySummaryStatisticsByDepartmentAndSubDept();
  }
}
