import {Table, Column, Model, BelongsTo, ForeignKey} from 'sequelize-typescript';
import { ApiProperty } from "@nestjs/swagger";
import { DataTypes } from "sequelize";
import {UserModel} from "../../users/models/user.model";

interface DocumentCreationAttrs {
    name: string;
    document: string;
    creatorId: number;
    reviewerId: number;
}

export enum StatusDocument {
    OK = 'OK',
    CANCELED = 'CANCELED',
    PROCESS = 'PROCESS'
}

@Table({ tableName: 'documents' })
export class DocumentModel extends Model<DocumentModel, DocumentCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    @Column({ type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Документ', description: 'Название документа' })
    @Column({ type: DataTypes.STRING, allowNull: false })
    name: string;

    @ApiProperty({ example: 'Файл DOCX', description: 'Файл документа' })
    @Column({ type: DataTypes.STRING, allowNull: false })
    document: string;

    @ApiProperty({ example: true, description: 'Подтверждение от ответственного' })
    @Column({ type: DataTypes.STRING, defaultValue: StatusDocument.PROCESS })
    status: string;

    @ForeignKey(() => UserModel)
    @Column({ type: DataTypes.INTEGER })
    creatorId: number;

    @BelongsTo(() => UserModel, 'creatorId')
    creator: UserModel;

    @ForeignKey(() => UserModel)
    @Column({ type: DataTypes.INTEGER })
    reviewerId: number;

    @BelongsTo(() => UserModel, 'reviewerId')
    reviewer: UserModel;
}