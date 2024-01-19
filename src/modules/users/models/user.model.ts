import {Table, Column, Model, HasOne, BelongsToMany, HasMany} from 'sequelize-typescript';
import { ApiProperty } from "@nestjs/swagger";
import { DataTypes } from "sequelize";
import { TokenModel } from "../../token/models/token.model";
import {RoleModel} from "../../roles/models/role.model";
import {UserRolesModel} from "./user-roles.model";
import {DocumentModel} from "../../documents/models/document.model";


interface UserCreationAttrs {
    fio: string;
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, UserCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    @Column({ type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Веприкова Марина Александровна', description: 'ФИО' })
    @Column({ type: DataTypes.STRING, allowNull: false })
    fio: string;

    @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
    @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: '123456789', description: 'Пароль' })
    @Column({ type: DataTypes.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: false, description: 'Забанен или нет' })
    @Column({ type: DataTypes.BOOLEAN, defaultValue: false })
    banned: boolean;

    @HasOne(() => TokenModel, 'userId')
    token: TokenModel

    @BelongsToMany(() => RoleModel, () => UserRolesModel)
    roles: RoleModel[]

    @HasMany(() => DocumentModel, 'creatorId')
    creatorDocuments: DocumentModel[];

    @HasMany(() => DocumentModel, 'reviewerId')
    reviewerDocuments: DocumentModel[];
}