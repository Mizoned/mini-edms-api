import { Module } from '@nestjs/common';
import { APP_GUARD, APP_FILTER, APP_PIPE } from "@nestjs/core";
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./modules/users/users.module";
import { DocumentsModule } from './modules/documents/documents.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import { RolesModule } from './modules/roles/roles.module';
import mainConfig from "./config/main.config";
import { JwtAuthGuard } from "./modules/auth/guards/jwt-auth.guard";
import { ApiExceptionFilter } from "./common/filters/api-exception.filter";
import { ApiValidationPipe } from "./common/pipes/api-validation.pipe";
import { FilesModule } from './modules/files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mainConfig],
      envFilePath: ['.env'],
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT, 10) || 5432,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_NAME,
      autoLoadModels: true,
      synchronize: true
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static',),
    }),
    UsersModule,
    DocumentsModule,
    AuthModule,
    TokenModule,
    RolesModule,
    FilesModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter
    },
    {
      provide: APP_PIPE,
      useClass: ApiValidationPipe
    }
  ],
})
export class AppModule {}
