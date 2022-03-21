import { DynamicModule, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { DefaultJwtOptionsFactory } from "./DefaultJwtOptionsFactory";
import { JwtRefreshStrategy } from "./strategy/jwt-refresh.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { ConfigModule } from "@nestjs/config";
import JwtConfig from "./config/jwt.config";
import { AuthOptions } from "./auth.interface";
import { AuthService } from "./auth.service";

@Module({})
export class AuthModule {
  static forRootAsync(options: AuthOptions | AuthOptions[]): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        ConfigModule.forRoot({
          load: [JwtConfig],
          ...options,
        }),
        PassportModule,
        JwtModule.registerAsync({
          useClass: DefaultJwtOptionsFactory,
        }),
      ],
      providers: [JwtStrategy, JwtRefreshStrategy],
      exports: [JwtService, AuthService],
    };
  }
}
