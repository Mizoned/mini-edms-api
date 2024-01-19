import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import {DocumentModel, StatusDocument} from "./models/document.model";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { ApiException } from "../../common/exeptions/ApiException";
import { FilesService } from "../files/files.service";
import { UserModel } from "../users/models/user.model";

@Injectable()
export class DocumentsService {
    constructor(@InjectModel(DocumentModel) private readonly documentsRepository: typeof DocumentModel,
                private fileService: FilesService) {
    }

    async getAll(): Promise<DocumentModel[]> {
        try {
            return await this.documentsRepository.findAll({
                where: { status: StatusDocument.OK },
                include: [
                    {
                        as: 'creator',
                        attributes: ['id', 'fio', 'email'],
                        model: UserModel
                    },
                    {
                        as: 'reviewer',
                        attributes: ['id', 'fio', 'email'],
                        model: UserModel
                    }
                ]
            });
        } catch (e) {
            console.log(e);
        }

    }

    async getById(id: number): Promise<DocumentModel> {
        const document: DocumentModel = await this.documentsRepository.findByPk(id);

        if (!document) {
            throw new ApiException('Документ не найден', HttpStatus.NOT_FOUND)
        }

        return document;
    }

    async create(creatorId: number, dto: CreateDocumentDto, document: any): Promise<DocumentModel> {
        console.log('test create', dto)
        const fileName = await this.fileService.createFile(document);
        const createdDocument= await this.documentsRepository.create({...dto, document: fileName, creatorId });

        return await this.documentsRepository.findByPk(createdDocument.id, {
            include: [
                {
                    as: 'creator',
                    attributes: ['id', 'fio', 'email'],
                    model: UserModel
                },
                {
                    as: 'reviewer',
                    attributes: ['id', 'fio', 'email'],
                    model: UserModel
                }
            ]
        });
    }


    async update(id: number, dto: UpdateDocumentDto): Promise<DocumentModel> {
        const document: DocumentModel = await this.documentsRepository.findByPk(id);

        if (!document) {
            throw new ApiException('Документ не найден', HttpStatus.NOT_FOUND)
        }

        return document.update(dto);
    }

    async getAllByUserId(id: number) {
        return await this.documentsRepository.findAll({
            where: { creatorId: id },
            include: [
                {
                    as: 'creator',
                    attributes: ['id', 'fio', 'email'],
                    model: UserModel
                },
                {
                    as: 'reviewer',
                    attributes: ['id', 'fio', 'email'],
                    model: UserModel
                }
            ]
        });
    }

    async acceptDocument(id: number) {
        const document: DocumentModel = await this.documentsRepository.findByPk(id);

        if (!document) {
            throw new ApiException('Документ не найден', HttpStatus.NOT_FOUND)
        }

        return document.update({ status: StatusDocument.OK });
    }

    async rejectDocument(id: number) {
        const document: DocumentModel = await this.documentsRepository.findByPk(id);

        if (!document) {
            throw new ApiException('Документ не найден', HttpStatus.NOT_FOUND)
        }

        return document.update({ status: StatusDocument.CANCELED });
    }


    async getAllByReviewerId(id: number) {
        return await this.documentsRepository.findAll({
            where: { reviewerId: id, status: StatusDocument.PROCESS },
            include: [
                {
                    as: 'creator',
                    attributes: ['id', 'fio', 'email'],
                    model: UserModel
                },
                {
                    as: 'reviewer',
                    attributes: ['id', 'fio', 'email'],
                    model: UserModel
                }
            ]
        });
    }
}
