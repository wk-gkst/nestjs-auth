import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "lib/jwt-payload";

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): JwtPayload => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
