import { ModuleMetadata } from "@nestjs/common";

export interface AuthOptions {
  cacheConfig?: boolean;
  //TODO: allow to override config
  // accessTokenSecret?: string;
  // accessTokenExpireIn?: string;
  // refreshTokenSecret?: string;
  // refreshTokenExpireIn?: string;
  // apiTokenSecret?: string;
  // apiTokenExpireIn?: string;
}

export interface AuthModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useFactory?: (...args: any[]) => Promise<AuthOptions> | AuthOptions;
  inject?: any[];
}
