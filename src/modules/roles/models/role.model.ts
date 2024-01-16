import {Table, Column, Model, BelongsToMany} from 'sequelize-typescript';
import { ApiProperty } from "@nestjs/swagger";
import { DataTypes } from "sequelize";
import { UserModel } from "../../users/models/user.model";
import { UserRolesModel } from "../../users/models/user-roles.model";

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

interface RoleCreationAttrs {
    value: Role;
    description: string;
}

@Table({ tableName: 'roles' })
export class RoleModel extends Model<RoleModel, RoleCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    @Column({ type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'ADMIN', description: 'Уникальное значение роли' })
    @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
    value: Role;

    @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
    @Column({ type: DataTypes.STRING, allowNull: false })
    description: string;

    @BelongsToMany(() => UserModel, () => UserRolesModel)
    users: UserModel[];
}