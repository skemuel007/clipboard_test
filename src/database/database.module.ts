import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('SQLITE_DB'),
        host: configService.get('SQLITE_HOST'),
        port: configService.get('SQLITE_PORT'),
        username: configService.get('SQLITE_USER'),
        password: configService.get('SQLITE_PASSWORD'),
        entities: [__dirname + '/../**/*.entity{.js,.ts}'],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
