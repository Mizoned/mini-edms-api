import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({ example: 'Веприкова Марина Александровна', description: 'ФИО' })
    readonly fio: string;

    @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
    readonly email: string;

    @ApiProperty({ example: '123456789', description: 'Пароль' })
    readonly password: string;

    @ApiProperty({ example: 'ture', description: 'Забанен пользователь или нет' })
    readonly banned: boolean;
}