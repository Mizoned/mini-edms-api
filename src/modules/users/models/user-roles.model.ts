import {Table, Column, Model, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model";
import { RoleModel } from "../../roles/models/role.model";

@Table({ tableName: 'user_roles' })
export class UserRolesModel extends Model<UserRolesModel> {
    @Column({ type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => UserModel)
    @Column({ type: DataTypes.NUMBER })
    userId: string;

    @ForeignKey(() => RoleModel)
    @Column({ type: DataTypes.NUMBER })
    roleId: string;
}