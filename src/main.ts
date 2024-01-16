import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    origin: `${configService.get('CLIENT_URL')}:${configService.get('CLIENT_PORT')}`
  })

  const config = new DocumentBuilder()
      .setTitle('Mini-Edms-API')
      .setDescription('Документация по Mini-Edms')
      .setVersion('1.0.0')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  const port = configService.get<number>('API_PORT');
  await app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
  });
}

bootstrap();