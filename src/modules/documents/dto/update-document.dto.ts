import { ApiProperty } from "@nestjs/swagger";

export class UpdateDocumentDto {
    @ApiProperty({ example: 'Документ', description: 'Название документа' })
    readonly name: string;

    @ApiProperty({ example: '12.12.2024', description: 'Срок выполнения' })
    readonly deadline: Date;
}