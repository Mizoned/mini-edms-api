import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put, Req,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DocumentsService } from "./documents.service";
import { DocumentModel } from "./models/document.model";
import { UserModel } from "../users/models/user.model";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import { Request } from "express";
import { JwtPayload } from "../token/token.service";


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

    @ApiOperation({ summary: 'Получение документов по id пользователя' })
    @ApiResponse({ status: 200, type: DocumentModel })
    @Get('/users/:id')
    async getAllByUserId(@Param('id') id: number): Promise<DocumentModel[]> {
        return await this.documentsService.getAllByUserId(id);
    }

    @ApiOperation({ summary: 'Получение документов по id пользователя' })
    @ApiResponse({ status: 200, type: DocumentModel })
    @Get('/reviewers/:id')
    async getAllByReviewerId(@Param('id') id: number): Promise<DocumentModel[]> {
        return await this.documentsService.getAllByReviewerId(id);
    }

    @ApiOperation({ summary: 'Получение документов по id пользователя' })
    @ApiResponse({ status: 200, type: DocumentModel })
    @Put('/accept/:id')
    async acceptDocument(@Param('id') id: number): Promise<DocumentModel> {
        return await this.documentsService.acceptDocument(id);
    }

    @ApiOperation({ summary: 'Получение документов по id пользователя' })
    @ApiResponse({ status: 200, type: DocumentModel })
    @Put('/reject/:id')
    async rejectDocument(@Param('id') id: number): Promise<DocumentModel> {
        return await this.documentsService.rejectDocument(id);
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
    @UseInterceptors(FileInterceptor('document'))
    create(@Body() dto: CreateDocumentDto,
           @UploadedFile() document: any,
           @Req() req: Request
    ): Promise<DocumentModel> {
        const user = req.user as JwtPayload;
        return this.documentsService.create(user.id, dto, document);
    }

    @ApiOperation({ summary: 'Обновление документа' })
    @ApiResponse({ status: 200, type: UserModel })
    @Put(':id')
    update(@Body() dto: UpdateDocumentDto, @Param('id') id: number): Promise<DocumentModel> {
        return this.documentsService.update(id, dto);
    }
}
