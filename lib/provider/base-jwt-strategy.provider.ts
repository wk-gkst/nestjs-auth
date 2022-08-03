import { JwtFromRequestFunction } from "passport-jwt";

export abstract class BaseJwtStrategyProvider {
  abstract get requestFrom(): JwtFromRequestFunction;

  abstract get ignoreExpiration(): boolean;

  abstract get secretOrKey(): string;

  abstract get algorithms(): string[];

  abstract get passReqToCallback(): boolean;

  abstract validate(payload: any): Promise<any>;
}
