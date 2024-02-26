import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AUTH_UTILS } from '../auth.utils';

import { BaseRole } from './roles.enum';
import { ROLE_KEY } from './roles.decorator';
import { USER_ROLE_SET } from './userRoles';
import { InternalAuthData } from '../models/internalAuthData.model';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const user = await this.getUser(context);
        
        const requiredRoles = this.getRouteRoles(context);
        
        if (!requiredRoles) {
            return true;
        }

        const userTypeRoles: BaseRole[] = USER_ROLE_SET[user.userType];

        return requiredRoles.some((role) => userTypeRoles?.includes(role));
    }

    private async getUser(context: ExecutionContext): Promise<InternalAuthData> {
        const request = context.switchToHttp().getRequest();
        const token = AUTH_UTILS.extractJWT(request);

        if (!token) {
          throw new UnauthorizedException();
        }

        try {
            const payload: InternalAuthData = await this.jwtService.verifyAsync(
              token,
              {
                secret: process.env.JWT_SECRET
              }
            );
          request['user'] = payload;
          return payload;
        } catch {
          throw new UnauthorizedException();
        }
    }

    private getRouteRoles(context: ExecutionContext): BaseRole[] {
        const requiredRoles: BaseRole[] = this.reflector.getAllAndOverride<BaseRole[]>(
            ROLE_KEY, 
            [
                context.getHandler(),
                context.getClass(),
            ]
        );

        return requiredRoles;
    }
}