import { TokenModel } from "../../token/models/token.model";

export default interface Tokens {
    accessToken: string;
    refreshToken: TokenModel;
}