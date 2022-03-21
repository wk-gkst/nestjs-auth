import { registerAs } from "@nestjs/config";

export default registerAs("jwt", () => ({
  accessTokenSecret: process.env.JWT_ACCESS_SECERT,
  accessTokenExpireIn: process.env.JWT_ACCESS_EXPIRE || "1h",
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
  refreshTokenExpireIn: process.env.JWT_REFRESH_EXPIRE || "1y",
}));
