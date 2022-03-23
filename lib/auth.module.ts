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
import { JwtApiStrategy } from "./strategy/jwt-api.strategy";

@Module({})
export class AuthModule {
  static forRootAsync(options: AuthOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        ConfigModule.forRoot({
          load: [JwtConfig],
          cache: options.cacheConfig,
        }),
        PassportModule,
        JwtModule.registerAsync({
          useClass: DefaultJwtOptionsFactory,
        }),
      ],
      providers: [JwtStrategy, JwtRefreshStrategy, JwtApiStrategy],
      exports: [JwtService, AuthService],
    };
  }
}
