import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const ApiParam = createParamDecorator(
  (data, ctx: ExecutionContext): any => {
    const req = ctx.switchToHttp().getRequest();
    // params
    return req.user;
  },
);
