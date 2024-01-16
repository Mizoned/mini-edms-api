import { ApiProperty } from "@nestjs/swagger";
import { TokenModel } from "../../token/models/token.model";
import Tokens from "../interfaces/tokens.interface";

export default class TokensDto implements Tokens {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAbWFpbC5ydSIsImlkIjo0LCJmaW8iOiLQqdC10YDQsdC40L3QuNC9INCS0LDQu9C10YDQuNC5INCV0LLQs9C10L3RjNC10LLQuNGHIiwiaWF0IjoxNzA0OTk3NzgwLCJleHAiOjE3MDUwODQxODB9.0PdXXVagiCKSPc121I-idCN61jX3k2aELeYqWb7l-yA',
        description: 'Access token'
    })
    readonly accessToken: string;

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAbWFpbC5ydSIsImlkIjo0LCJmaW8iOiLQqdC10YDQsdC40L3QuNC9INCS0LDQu9C10YDQuNC5INCV0LLQs9C10L3RjNC10LLQuNGHIiwiaWF0IjoxNzA0OTk3NzgwLCJleHAiOjE3MDc1ODk3ODB9.btSly1-lavYRdxng9zX4N_Me589JrH8tyYQsxJQkmkk',
        description: 'Refresh token'
    })
    readonly refreshToken: TokenModel;
}