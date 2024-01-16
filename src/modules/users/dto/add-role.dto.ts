import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../roles/models/role.model";

export class AddRoleDto {
    @ApiProperty({ example: Object.values(Role), description: 'Роли' })
    readonly roles: Role[];

    @ApiProperty({ example: 1, description: 'ID пользователя' })
    readonly userId: string;
}