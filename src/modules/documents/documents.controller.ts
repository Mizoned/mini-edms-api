import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DocumentsService } from "./documents.service";
import { DocumentModel } from "./models/document.model";
import { UserModel } from "../users/models/user.model";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";


@ApiTags('Документы')
@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) {}

    @ApiOperation({ summary: 'Получение всех документов' })
    @ApiResponse({ status: 200, type: [DocumentModel] })
    @Get()
    async getAll(): Promise<DocumentModel[]> {
        return await this.documentsService.getAll();
    }

    @ApiOperation({ summary: 'Получение документа по id' })
    @ApiResponse({ status: 200, type: DocumentModel })
    @Get(':id')
    async getOne(@Param('id') id: number): Promise<DocumentModel> {
        return await this.documentsService.getById(id);
    }

    @ApiOperation({ summary: 'Создание документа' })
    @ApiResponse({ status: HttpStatus.CREATED, type: DocumentModel })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateDocumentDto): Promise<DocumentModel> {
        return this.documentsService.create(dto);
    }

    @ApiOperation({ summary: 'Обновление документа' })
    @ApiResponse({ status: 200, type: UserModel })
    @Put(':id')
    update(@Body() dto: UpdateDocumentDto, @Param('id') id: number): Promise<DocumentModel> {
        return this.documentsService.update(id, dto);
    }
}
