import { ModuleMetadata } from "@nestjs/common";

export interface AuthOptions {
  cacheConfig?: boolean;
}

export interface AuthModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useFactory?: (...args: any[]) => Promise<AuthOptions> | AuthOptions;
  inject?: any[];
}
