import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Req,
    Res,
    UnauthorizedException
} from '@nestjs/common';
import { AuthService } from "./auth.service";
import {ApiOperation, ApiResponse, ApiTags, PartialType} from "@nestjs/swagger";
import { UserModel } from "../users/models/user.model";
import LoginUserDto from "./dto/login-user.dto";
import { Request, Response } from 'express';
import Tokens from "./interfaces/tokens.interface";
import { Public } from "../../common/decorators/public.decorator";
import { Cookie } from "../../common/decorators/cookies.decorator";
import TokensDto from "./dto/tokens.dto";
import {ApiException} from "../../common/exeptions/ApiException";


const REFRESH_TOKEN = 'refreshToken';

@Public()
@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Авторизация по email' })
    @ApiResponse({ status: 200, type: UserModel })
    @Post('sign-in')
    async signIn(@Body() dto: LoginUserDto, @Res() res: Response) {

        const tokens = await this.authService.signIn(dto);

        this.setRefreshTokenToCookies(tokens, res);
    }

    @ApiOperation({ summary: 'Выход из системы' })
    @ApiResponse({ status: 200 })
    @Get('logout')
    async logout(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response) {
        if (!refreshToken) {
            res.sendStatus(HttpStatus.OK);
            return;
        }

        await this.authService.logout(refreshToken);
        res.clearCookie(REFRESH_TOKEN);
        res.sendStatus(HttpStatus.OK);
    }

    @ApiOperation({ summary: 'Обновление refresh токена' })
    @ApiResponse({ status: 200, type: TokensDto  })
    @Get('refresh-tokens')
    async refresh(@Cookie(REFRESH_TOKEN) refreshToken: string,@Req() req: Request, @Res() res: Response): Promise<Tokens> {
        if (!refreshToken) {
            throw new ApiException('Пользователь не авторизован', HttpStatus.UNAUTHORIZED);
        }

        const tokens: Tokens = await this.authService.refreshTokens(refreshToken);

        this.setRefreshTokenToCookies(tokens, res);
        return tokens;
    }

    private setRefreshTokenToCookies(tokens: Tokens, response: Response) {
        if (!tokens) {
            throw new ApiException('Пользователь не авторизован', HttpStatus.UNAUTHORIZED);
        }

        response.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(tokens.refreshToken.exp),
            secure: false,
            path: '/'
        });

        response.status(HttpStatus.OK).json(tokens);
    }
}
