import { Injectable } from "@nestjs/common";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

export interface RSAJwtOptions {
  privateKey: string;
  passphrase?: string;
  signOptions: {
    expiresIn?: string | number;
    algorithm?: "RS256" | "RS384" | "RS512" | "none";
  };
}

@Injectable()
export class SecretJwtOptionsFactory implements JwtOptionsFactory {
  private options: RSAJwtOptions;
  constructor(options: RSAJwtOptions) {
    this.options = {
      ...options,
    };
    this.options.privateKey = this.options.privateKey?.replace(/\\n/gm, "\n");
    if (!this.options?.signOptions?.algorithm) {
      this.options.signOptions.algorithm = "RS256";
    }
  }

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    const privateKey = this.options.passphrase
      ? {
          key: this.options.privateKey,
          passphrase: this.options.passphrase,
        }
      : this.options.privateKey;
    return {
      privateKey,
      signOptions: {
        ...this.options.signOptions,
      },
    };
  }
}
