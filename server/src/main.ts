import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'body-parser'

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(urlencoded({
    extended: true,
  }))
  app.use(json())
  await app.listen(3000);
}
bootstrap();
