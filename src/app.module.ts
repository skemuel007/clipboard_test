import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { DatasetModule } from './dataset/dataset.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './utils/exceptions-logger.filter';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { HealthModule } from './health/health.module';
// import { SeederModule } from './seeder/seeder.module';
import { Seeder } from './seeder/seeder';
import { DatasetSeederModule } from './seeder/dataset/dataset-seeder.module';
import { AuthSeederModule } from './seeder/auth/auth-seeder.module';

@Module({
  imports: [
    DatabaseModule,
    DatasetSeederModule,
    AuthSeederModule,
    DatasetModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SQLITE_DB: Joi.string().required(),
        SQLITE_USER: Joi.string().required(),
        SQLITE_PASSWORD: Joi.string().required(),
        SQLITE_HOST: Joi.string().required(),
        SQLITE_PORT: Joi.number().required(),
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    UserModule,
    AuthenticationModule,
    HealthModule,
    // SeederModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    Logger,
    Seeder,
  ],
})
export class AppModule {}
