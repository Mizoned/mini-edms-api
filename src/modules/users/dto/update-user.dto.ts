import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../roles/models/role.model";

export class UpdateUserDto {
    @ApiProperty({ example: 'Веприкова Марина Александровна', description: 'ФИО' })
    readonly fio: string;

    @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
    readonly email: string;

    @ApiProperty({ example: '123456789', description: 'Пароль' })
    readonly password: string;

    @ApiProperty({ example: Object.values(Role), description: 'Роли' })
    readonly roles: Role[];
}