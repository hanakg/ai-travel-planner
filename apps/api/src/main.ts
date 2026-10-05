import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerModule,
  type SwaggerDocumentOptions,
} from '@nestjs/swagger';
import z from 'zod';
import { toOpenApiSchema } from './utils/zod-openapi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('AI Travel Planner API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const swaggerOptions: SwaggerDocumentOptions = {
    standardSchemaConverter: (schema, { schemaType }) => ({
      schema: toOpenApiSchema(
        schema as z.ZodType,
        schemaType === 'input' ? 'input' : 'output',
      ),
    }),
  };

  const document = SwaggerModule.createDocument(app, config, swaggerOptions);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
