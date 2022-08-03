import { ExtractJwt, JwtFromRequestFunction } from "passport-jwt";
import { BaseJwtStrategyProvider } from "./base-jwt-strategy.provider";

export interface SecretJwtOptions {
  secret: string;

  algorithms: string[];

  jwtFromRequest?: JwtFromRequestFunction;

  ignoreExpiration?: boolean;

  passReqToCallback?: boolean;
}

export class SecretJwtStrategyProvider extends BaseJwtStrategyProvider {
  private option: SecretJwtOptions;

  constructor(option: SecretJwtOptions) {
    super();
    const defaultOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: false,
      algorithms: ["HS256"],
    };

    this.option = {
      ...defaultOptions,
      ...option,
    };
  }

  get requestFrom(): JwtFromRequestFunction {
    return this.option.jwtFromRequest;
  }
  get ignoreExpiration(): boolean {
    return this.option.ignoreExpiration;
  }
  get secretOrKey(): string {
    return this.option.secret;
  }
  get algorithms(): string[] {
    return this.option.algorithms;
  }
  get passReqToCallback(): boolean {
    return this.option.passReqToCallback;
  }

  async validate(payload: any): Promise<any> {
    return payload;
  }
}
