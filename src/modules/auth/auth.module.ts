import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { TokenModule } from "../token/token.module";
import { GUARDS } from "./guards";
import { STRATEGIES } from "./strategies";

@Module({
  providers: [AuthService, ...STRATEGIES, ...GUARDS],
  controllers: [AuthController],
  imports: [
      UsersModule,
      TokenModule
  ]
})
export class AuthModule {}
