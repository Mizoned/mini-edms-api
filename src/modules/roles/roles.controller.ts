import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role, RoleModel} from "./models/role.model";
import { CreateRoleDto } from "./dto/create-role.dto";
import {UsersService} from "../users/users.service";
import {RolesService} from "./roles.service";

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @ApiOperation({ summary: 'Создать роль' })
    @ApiResponse({ status: 200, type: RoleModel })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateRoleDto) {
        return await this.rolesService.create(dto);
    }

    @ApiOperation({ summary: 'Поулчить роль' })
    @ApiResponse({ status: 200, type: RoleModel })
    @Get('/:value')
    async get(@Param('value') value: Role) {
        return await this.rolesService.getRoleByValue(value);
    }

    @ApiOperation({ summary: 'Поулчить роли' })
    @ApiResponse({ status: 200, type: [RoleModel] })
    @Get('/')
    async getAll() {
        return await this.rolesService.getAll();
    }
}
