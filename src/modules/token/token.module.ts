import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { TokenModel } from "./models/token.model";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    SequelizeModule.forFeature([TokenModel]),
    JwtModule.register({})
  ],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
