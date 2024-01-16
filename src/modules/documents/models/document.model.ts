import { Table, Column, Model } from 'sequelize-typescript';
import { ApiProperty } from "@nestjs/swagger";
import { DataTypes } from "sequelize";

interface DocumentCreationAttrs {
    name: string;
    deadline: Date;
}

@Table({ tableName: 'documents' })
export class DocumentModel extends Model<DocumentModel, DocumentCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    @Column({ type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Документ', description: 'Название документа' })
    @Column({ type: DataTypes.STRING, allowNull: false })
    name: string;

    @ApiProperty({ example: '12.12.2024', description: 'Срок выполнения' })
    @Column({ type: DataTypes.DATEONLY, allowNull: false })
    deadline: Date;
}