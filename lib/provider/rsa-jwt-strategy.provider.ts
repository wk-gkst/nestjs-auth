import { ExtractJwt, JwtFromRequestFunction } from "passport-jwt";
import { BaseJwtStrategyProvider } from "./base-jwt-strategy.provider";

export interface RSAJwtOptions {
  publicKey: string;

  algorithms: string[];

  jwtFromRequest?: JwtFromRequestFunction;

  ignoreExpiration?: boolean;

  passReqToCallback?: boolean;
}

export class RSAJwtStrategyProvider extends BaseJwtStrategyProvider {
  private option: RSAJwtOptions;

  constructor(option: RSAJwtOptions) {
    super();
    const defaultOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: false,
      algorithms: ["RS256"],
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
    // fix no start line issue
    return this.option.publicKey?.replace(/\\n/gm, "\n");
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
