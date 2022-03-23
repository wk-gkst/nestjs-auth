import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import JwtConfig from "../config/jwt.config";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class JwtApiStrategy extends PassportStrategy(Strategy, "jwt-api") {
  constructor(
    @Inject(JwtConfig.KEY)
    private jwtConfig: ConfigType<typeof JwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.apiTokenSecret,
    });
  }

  async validate(payload: any): Promise<any> {
    return payload;
  }
}
