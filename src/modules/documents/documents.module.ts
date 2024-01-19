import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { DocumentsController } from "./documents.controller";
import { DocumentModel } from "./models/document.model";
import {UserModel} from "../users/models/user.model";
import {FilesModule} from "../files/files.module";

@Module({
  imports: [
      SequelizeModule.forFeature([UserModel, DocumentModel]),
      FilesModule
  ],
  providers: [DocumentsService],
  controllers: [DocumentsController]
})
export class DocumentsModule {}
