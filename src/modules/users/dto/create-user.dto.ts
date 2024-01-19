import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from "class-validator";
import {Role} from "../../roles/models/role.model";

export class CreateUserDto {
    @ApiProperty({ example: 'Веприкова Марина Александровна', description: 'ФИО' })
    @IsString({ message: 'Поле должно быть строкой' })
    @IsNotEmpty({ message: 'Обязательное поле' })
    readonly fio: string;

    @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
    @IsEmail({}, { message: 'Email введён некорректно' })
    @IsNotEmpty({ message: 'Обязательное поле' })
    readonly email: string;

    @ApiProperty({ example: '123456789', description: 'Пароль' })
    @MinLength(8, { message: 'Пароль должен содержать не менее 8 символов' })
    @IsNotEmpty({ message: 'Обязательное поле' })
    readonly password: string;

    @ApiProperty({ example: Object.values(Role), description: 'Роли' })
    @IsNotEmpty({ message: 'Обязательное поле' })
    readonly roles: Role[];
}