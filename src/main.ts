import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  console.log("PORT", process.env.PORT_SERVICE);
  await app.listen(process.env.PORT_SERVICE || 3000, process.env.SERVICE_URL || '127.0.0.1');
}
bootstrap();
