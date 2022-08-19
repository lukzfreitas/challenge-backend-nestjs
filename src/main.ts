import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setSwagger(app);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

function setSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Challenge backend Alura')
    .setDescription('The Challenge backend Alura API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
