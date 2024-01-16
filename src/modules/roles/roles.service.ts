import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from "./dto/create-role.dto";
import { InjectModel } from "@nestjs/sequelize";
import {Role, RoleModel} from "./models/role.model";

@Injectable()
export class RolesService {
    constructor(@InjectModel(RoleModel) private readonly rolesRepository: typeof RoleModel) {}

    async create(roleDto: CreateRoleDto): Promise<RoleModel> {
        return await this.rolesRepository.create(roleDto);
    }

    async getRoleByValue(value: Role): Promise<RoleModel> {
        return await this.rolesRepository.findOne({ where: { value } });
    }

    async getRolesByValue(value: Role[]): Promise<RoleModel[]> {
        return await this.rolesRepository.findAll({ where: { value } });
    }

    async getAll(): Promise<RoleModel[]> {
        return await this.rolesRepository.findAll();
    }
}
