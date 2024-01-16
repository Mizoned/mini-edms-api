import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../models/role.model";

export class CreateRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Уникальное значение роли' })
    readonly value: Role;

    @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
    readonly description: string;
}