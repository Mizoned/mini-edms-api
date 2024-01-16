import {ForbiddenException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import LoginUserDto from "./dto/login-user.dto";
import {UsersService} from "../users/users.service";
import {compareSync} from "bcrypt";
import Tokens from "./interfaces/tokens.interface";
import {TokenService} from "../token/token.service";
import {ApiException} from "../../common/exeptions/ApiException";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private tokensService: TokenService) {}

    async signIn(dto: LoginUserDto): Promise<Tokens> {
        const user = await this.usersService.getByEmail(dto.email);

        if (!user || !compareSync(dto.password, user.password)) {
            throw new ApiException('Ошибка авторизации', HttpStatus.BAD_REQUEST, [
                {
                    property: 'password',
                    message: 'Неверный логин или пароль'
                }
            ]);
        }

        return await this.tokensService.generateTokens(user);
    }

    async logout(refreshToken: string) {
        return this.tokensService.delete(refreshToken);
    }

    async refreshTokens(refreshToken: string): Promise<Tokens> {
        const tokenModel = await this.tokensService.findRefreshToken(refreshToken);

        if (!tokenModel || !tokenModel.token) {
            throw new ApiException('Доступ к ресурсу запрещен', HttpStatus.FORBIDDEN);
        }

        const refreshTokenMatches = await this.tokensService.validateRefreshToken(tokenModel.token);

        if (!refreshTokenMatches) {
            throw new ApiException('Доступ к ресурсу запрещен', HttpStatus.FORBIDDEN);
        }

        const user = await this.usersService.getById(tokenModel.userId);

        return await this.tokensService.generateTokens(user);
    }
}
