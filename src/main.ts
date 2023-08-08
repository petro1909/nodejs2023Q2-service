import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { serve, setup } from 'swagger-ui-express';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = load((await readFile('./doc/api.yaml')).toString());
  app.use('/doc', serve, setup(document));

  await app.listen(PORT);
  console.log(`Server starts at port ${PORT}`);
}
bootstrap();
