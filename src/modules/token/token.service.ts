import {Injectable} from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { TokenModel } from "./models/token.model";
import { JwtService } from "@nestjs/jwt";
import { UserModel } from "../users/models/user.model";
import { RoleModel } from "../roles/models/role.model";
import Tokens from "../auth/interfaces/tokens.interface";

export type JwtPayload = {
    id: number;
    fio: string;
    email: string;
    roles: RoleModel[];
}

@Injectable()
export class TokenService {
    constructor(@InjectModel(TokenModel) private readonly tokensRepository: typeof TokenModel, private jwtService: JwtService) {}

    async delete(token: string) {
        return await this.tokensRepository.destroy({ where: { token } });
    }

    validateAccessToken(token: string) {
        try {
            return  this.jwtService.verify(token, {
                secret: process.env.JWT_ACCESS_SECRET_KEY
            });
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            return this.jwtService.verify(token, {
                secret: process.env.JWT_REFRESH_SECRET_KEY
            });
        } catch (e) {
            return null;
        }
    }

    async findRefreshToken(refreshToken: string) {
        return await this.tokensRepository.findOne({where: {token: refreshToken}});
    }

    async generateTokens(user: UserModel): Promise<Tokens> {
        const payload: JwtPayload = { email: user.email, id: user.id, fio: user.fio, roles: user.roles };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                payload,
                {
                    secret: process.env.JWT_ACCESS_SECRET_KEY,
                    expiresIn: '24h',
                }
            ),
            this.getRefreshToken(payload)
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    private async getRefreshToken(payload: JwtPayload): Promise<TokenModel> {
        const _token = await this.tokensRepository.findOne({
            where: { userId: payload.id }
        });

        if (_token) {
            if (new Date() < new Date(_token.exp)) {
                let { exp, token } = await this.generateRefreshToken(payload);

                await _token.update({
                    token,
                    exp
                });
            }
            return _token;
        } else {
            let { exp, token } = await this.generateRefreshToken(payload);

            return await this.tokensRepository.create({
                userId: payload.id,
                token,
                exp
            });
        }
    }

    private async generateRefreshToken(payload: JwtPayload): Promise<{ exp: Date, token: string }> {
        let currentDate = new Date();

        currentDate.setDate(currentDate.getDate() + 30);

        const token = await this.jwtService.signAsync(
            payload,
            {
                secret: process.env.JWT_REFRESH_SECRET_KEY,
                expiresIn: '30d',
            }
        );

        return {
            exp: currentDate,
            token
        }
    }
}
