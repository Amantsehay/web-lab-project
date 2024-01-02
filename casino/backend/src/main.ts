import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from 'dotenv';
import {ValidationPipe} from '@nestjs/common';
import {env} from 'process';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true,
    }
  ));
  await app.listen(env.PORT_NUMBER).catch((error)=>{
    console.log(error, "connection failed");
  });
  console.log("connection to port successful ")
}
bootstrap();
