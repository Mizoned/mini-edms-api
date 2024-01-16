import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { DocumentsController } from "./documents.controller";
import { DocumentModel } from "./models/document.model";

@Module({
  imports: [SequelizeModule.forFeature([DocumentModel])],
  providers: [DocumentsService],
  controllers: [DocumentsController]
})
export class DocumentsModule {}
