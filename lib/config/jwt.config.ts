import { registerAs } from "@nestjs/config";
import { generateRandomHash } from "@gkst/common";

export default registerAs("jwt", () => ({
  accessTokenSecret: process.env.JWT_ACCESS_SECERT,
  accessTokenExpireIn: process.env.JWT_ACCESS_EXPIRE || "1h",
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET || generateRandomHash(128), // generate random if not provided, will throw error if empty
  refreshTokenExpireIn: process.env.JWT_REFRESH_EXPIRE || "1y",
  apiTokenSecret: process.env.JWT_API_SECRET || generateRandomHash(128), // generate random if not provided, will throw error if empty
  apiTokenExpireIn: process.env.JWT_API_EXPIRE || "60s",
}));
