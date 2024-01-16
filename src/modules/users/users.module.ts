import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UserModel } from "./models/user.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { RoleModel } from "../roles/models/role.model";
import { UserRolesModel } from "./models/user-roles.model";
import { RolesModule } from "../roles/roles.module";

@Module({
    imports: [
        SequelizeModule.forFeature([UserModel, UserRolesModel]),
        RolesModule
    ],
    providers: [
        UsersService
    ],
    controllers: [UsersController],
    exports: [
        UsersService
    ]
})
export class UsersModule {}