// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Rewards API')
    .setDescription('Backend API for user rewards and redemptions')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // <-- Swagger UI path

  await app.listen(process.env.PORT || 3000);
  console.log(
    `🚀 Server running at http://localhost:${process.env.PORT || 3000}`,
  );
  console.log(
    `📄 Swagger docs at http://localhost:${process.env.PORT || 3000}/api-docs`,
  );
}
bootstrap();
