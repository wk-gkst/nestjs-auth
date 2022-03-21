import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import JwtConfig from "../config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { JwtPayload } from "lib/jwt-payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(JwtConfig.KEY)
    private jwtConfig: ConfigType<typeof JwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.accessTokenSecret,
    });
  }

  // simple return a user object because strategy already validate the jwt token
  async validate(payload: any): Promise<JwtPayload> {
    return {
      sub: payload.id.toString(),
      id: payload.id,
      username: payload.username,
      email: payload.email,
      mobile: payload.mobile,
    };
  }
}
