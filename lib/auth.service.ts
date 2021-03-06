import { Inject, Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { ConfigType } from "@nestjs/config";
import JwtConfig from "./config/jwt.config";
import { JwtPayload } from "./jwt-payload";

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtConfig.KEY)
    private jwtConfig: ConfigType<typeof JwtConfig>,
    private jwtService: JwtService,
  ) {}

  async refreshToken(refreshToken: string, user: any | JwtPayload) {
    //TODO: perform some refreshToken validation
    return {
      accessToken: await this.getAccessToken(user),
      refreshToken: await this.getRefreshToken(user),
    };
  }

  async getAccessToken(payload: any | JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async getRefreshToken(payload: any | JwtPayload) {
    return this.jwtService.sign(payload, this.getRefreshTokenOptions());
  }

  async getApiToken(payload: any) {
    return this.jwtService.sign(payload, this.getApiTokenOptions());
  }

  private getRefreshTokenOptions(): JwtSignOptions {
    const options: JwtSignOptions = {
      secret: this.jwtConfig.refreshTokenSecret,
    };
    const expiration: string = this.jwtConfig.refreshTokenExpireIn;
    if (expiration) {
      options.expiresIn = expiration;
    }
    return options;
  }

  private getApiTokenOptions(): JwtSignOptions {
    const options: JwtSignOptions = {
      secret: this.jwtConfig.apiTokenExpireIn,
    };
    const expiration: string = this.jwtConfig.apiTokenExpireIn;
    if (expiration) {
      options.expiresIn = expiration;
    }
    return options;
  }
}
