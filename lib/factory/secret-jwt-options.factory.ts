import { Injectable } from "@nestjs/common";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

export interface SecretJwtOptions {
  secret: string;
  signOptions: {
    expiresIn?: string | number;
  };
}

@Injectable()
export class SecretJwtOptionsFactory implements JwtOptionsFactory {
  private options: SecretJwtOptions;
  constructor(options: SecretJwtOptions) {
    this.options = {
      ...options,
    };
  }

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: this.options.secret,
      signOptions: {
        algorithm: "HS256",
        ...this.options.signOptions,
      },
    };
  }
}
