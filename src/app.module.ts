import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DatasetModule } from './dataset/dataset.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_FILTER } from "@nestjs/core";
import { ExceptionsLoggerFilter } from "../utils/exceptions-logger.filter";
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    DatasetModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SQLITE_DB: Joi.string().required(),
        SQLITE_USER: Joi.string().required(),
        SQLITE_PASSWORD: Joi.string().required(),
        SQLITE_HOST: Joi.string().required(),
        SQLITE_PORT: Joi.number().required(),
        PORT: Joi.number().required(),
      }),
    }),
    UserModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    }
  ],
})
export class AppModule {}
