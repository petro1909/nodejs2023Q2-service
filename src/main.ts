import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { serve, setup } from 'swagger-ui-express';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { CustomLoggerService } from './service/app.loggingService';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(CustomLoggerService));

  const document = load((await readFile('./doc/api.yaml')).toString());
  app.use('/doc', serve, setup(document));

  await app.listen(PORT);
  console.log(`Server starts at port ${PORT}`);
}

bootstrap();
