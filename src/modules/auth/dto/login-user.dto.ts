import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export default class LoginUserDto {
    @ApiProperty({ example: 'user@mail.ru', description: 'Email' })
    @IsEmail({}, { message: 'Email введён некорректно' })
    @IsNotEmpty({ message: 'Обязательное поле' })
    readonly email: string;

    @ApiProperty({ example: '123456789', description: 'Пароль' })
    @MinLength(8, { message: 'Пароль должен содержать не менее 8 символов' })
    @IsNotEmpty({ message: 'Обязательное поле' })
    readonly password: string;
}