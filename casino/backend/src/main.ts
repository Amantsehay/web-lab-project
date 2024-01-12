import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app
    .listen(process.env.PORT_NUMBER)
    .catch((error) => {
      console.log(error, "connection failed");
    });
  console.log("connection to port successful ");
  app.use(cookieParser());
}

bootstrap();
