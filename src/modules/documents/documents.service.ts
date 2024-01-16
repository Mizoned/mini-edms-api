import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { DocumentModel } from "./models/document.model";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import {ApiException} from "../../common/exeptions/ApiException";

@Injectable()
export class DocumentsService {
    constructor(@InjectModel(DocumentModel) private readonly documentsRepository: typeof DocumentModel) {}
    async getAll(): Promise<DocumentModel[]> {
        return await this.documentsRepository.findAll();
    }

    async getById(id: number): Promise<DocumentModel> {
        const document: DocumentModel = await this.documentsRepository.findByPk(id);

        if (!document) {
            throw new ApiException('Документ не найден', HttpStatus.NOT_FOUND)
        }

        return document;
    }

    async create(dto: CreateDocumentDto): Promise<DocumentModel> {
        return await this.documentsRepository.create(dto);
    }

    async update(id: number, dto: UpdateDocumentDto): Promise<DocumentModel> {
        const document: DocumentModel = await this.documentsRepository.findByPk(id);

        if (!document) {
            throw new ApiException('Документ не найден', HttpStatus.NOT_FOUND)
        }

        return document.update(dto);
    }
}
