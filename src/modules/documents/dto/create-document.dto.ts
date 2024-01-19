import { ApiProperty } from "@nestjs/swagger";

export class CreateDocumentDto {
    @ApiProperty({ example: 'Документ', description: 'Название документа' })
    readonly name: string;

    @ApiProperty({ example: '1', description: 'Идентификатор создателя' })
    readonly reviewerId: number;

    @ApiProperty({ example: 'Файл', description: 'Файл документа' })
    readonly document: string;
}