import { ApiProperty } from "@nestjs/swagger";
import { RoleModel } from "../../roles/models/role.model";
import { UserModel } from "../models/user.model";

export class ResponseUser {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    readonly id: number;

    @ApiProperty({ example: 'Веприкова Марина Александровна', description: 'ФИО' })
    readonly fio: string;

    @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
    readonly email: string;

    @ApiProperty({ example: '', description: 'Роли' })
    readonly roles: RoleModel[];

    @ApiProperty({ example: 'ture', description: 'Забанен пользователь или нет' })
    readonly banned: boolean;

    constructor(user: UserModel) {
        this.id = user.id;
        this.fio = user.fio;
        this.email = user.email;
        this.roles = user.roles;
        this.banned = user.banned;
    }
}