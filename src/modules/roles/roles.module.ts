import { Module } from '@nestjs/common';
import { RolesService } from "./roles.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { RoleModel } from "./models/role.model";
import { RolesController } from './roles.controller';
import { UserModel } from "../users/models/user.model";
import { UserRolesModel } from "../users/models/user-roles.model";

@Module({
    imports: [SequelizeModule.forFeature([RoleModel, UserRolesModel])],
    providers: [RolesService],
    exports: [RolesService],
    controllers: [RolesController]
})
export class RolesModule {}
