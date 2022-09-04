import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from './types/jtw-payload.type';

export const GetCurrentUserUsername = createParamDecorator(
  (_: undefined, context: ExecutionContext): String => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    return user.username;
  },
);
