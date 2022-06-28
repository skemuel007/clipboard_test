import { Injectable, Logger } from '@nestjs/common';
import { DatasetSeederService } from './dataset/dataset-seeder.service';
import { AuthSeederService } from './auth/auth-seeder.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly datasetSeederService: DatasetSeederService,
    private readonly authUserSeederService: AuthSeederService,
  ) {}

  async seed() {
    await this.authUsers()
      .then((completed) => {
        this.logger.debug('Successfully completed users...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
    await this.dataSets()
      .then((completed) => {
        this.logger.debug('Successfully completed seeding datasets...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding data sets...');
        Promise.reject(error);
      });
  }

  async dataSets() {
    return await Promise.all(this.datasetSeederService.create())
      .then((createdDataSets) => {
        this.logger.debug(
          'No. of data set created: ' +
            createdDataSets.filter(
              (nullValueOrCreatedDataSet) => nullValueOrCreatedDataSet,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async authUsers() {
    return await Promise.all(this.authUserSeederService.create())
      .then((createdAuthUsers) => {
        this.logger.debug(
          'No. of users created: ' +
            createdAuthUsers.filter(
              (nullValueOrCreatedUser) => nullValueOrCreatedUser,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
