import { HealthChecker, HealthEndpoint, LivenessEndpoint, ReadinessEndpoint } from '@cloudnative/health-connect';
import { InternalServerErrorException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@parkside-stack/api/app/app.module';
import * as dotenvExt from 'dotenv-extended';

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

async function bootstrap(): Promise<any> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );
  const options = new DocumentBuilder()
    .setTitle('Parkside Stack')
    .setDescription('The API for the Parkside Stack Application')
    .setVersion(process.env.API_VERSION as string)
    .setBasePath(process.env.API_PATH as string)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const globalPrefix = process.env.API_PATH;
  if (!globalPrefix) {
    throw new InternalServerErrorException(`environment variable API_PATH could not be resolved`);
  }
  app.setGlobalPrefix(globalPrefix);

  // setup middlewares
  // Kubernetes health endpoints
  // https://www.cloudnativejs.io/
  const healthChecker = new HealthChecker();
  app.use('/live', LivenessEndpoint(healthChecker));
  app.use('/ready', ReadinessEndpoint(healthChecker));
  app.use('/health', HealthEndpoint(healthChecker));

  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

dotenvExt.load();
bootstrap();
