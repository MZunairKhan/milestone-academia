import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LoggingMessages } from 'apps/api/src/assets/logging-messages';
import { validate } from 'uuid';

export const UuidValidator=   createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {

    const request = ctx.switchToHttp().getRequest();
    const methodName = ctx.getHandler().name;
    const className =ctx.getClass().name;

    if (!request || !request.params) {
      throw new Error('Request or request parameters are undefined');
    }

    const paramValue = request.params;

    const keys = Object.keys(paramValue).filter(k => k.toLowerCase().includes('id'));

    keys.forEach(key => {
      if (!validate(paramValue[key])) {
        const errorLog = {
          className: className,
          methodName: methodName,
          message: LoggingMessages.uuid.error(paramValue[key]),
          error: new Error(`Invalid UUID for ${key}`),
          stackTrace: null,
        };
        
        data['errorLogger'](errorLog)
        throw new BadRequestException('Invalid ID')
      }
    });

    return null;
  },
);




