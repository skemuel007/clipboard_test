import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Seeder } from './seeder/seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  const configService = app.get(ConfigService);
  const logger = app.get(Logger);
  const seeder = app.get(Seeder);
  // https://medium.com/the-crowdlinker-chronicle/seeding-databases-using-nestjs-cd6634e8efc5
  try {
    seeder
      .seed()
      .then(() => {
        logger.debug('Seeding complete!');
      })
      .catch((error) => {
        logger.error('Seeding failed');
        throw error;
      });
  } catch (err) {
    logger.error(err);
  }

  app.enableCors();
  /*app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['', 'v1', 'v2'],
    prefix: '',
  });*/
  const config = new DocumentBuilder()
    .setTitle('Clipboard Test')
    .setDescription('The DataSet API description')
    .setVersion('1.0')
    .addTag('dataset')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  //const { httpAdapter } = app.get(HttpAdapterHost);
  //app.useGlobalFilters(new ExceptionsLoggerFilter());

  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const port = configService.get('PORT') ?? 3000;

  await app.listen(port);
}
bootstrap();
