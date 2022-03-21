import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import JwtConfig from "./config/jwt.config";

@Injectable()
export class DefaultJwtOptionsFactory implements JwtOptionsFactory {
  constructor(
    @Inject(JwtConfig.KEY)
    private jwtConfig: ConfigType<typeof JwtConfig>,
  ) {}
  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: this.jwtConfig.accessTokenSecret,
      signOptions: { expiresIn: this.jwtConfig.accessTokenExpireIn },
    };
  }
}
