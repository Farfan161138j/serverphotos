import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//para los decoradores del dto
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  
  app.useGlobalPipes(new ValidationPipe({
    //borra datos extra automaticamente
    whitelist: true,
    //manda error en vez de borrarlos
    forbidNonWhitelisted: true,
  }));

  await app.listen(3001);
}
bootstrap();