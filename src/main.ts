
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('NestTodo-API')
    .setDescription('The NestTodo API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER_ROOT ?? 'docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${ process.env.HOST+":"+ process.env.PORT}`);
  console.log(`Swagger is available at: ${process.env.HOST+":"+ process.env.PORT}${process.env.SWAGGER_ROOT ?? '/docs'}`);
}
bootstrap();
