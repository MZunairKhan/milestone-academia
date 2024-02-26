
import { SetMetadata } from '@nestjs/common';
import { BaseRole } from '@milestone-academia/api-interfaces';

export const ROLE_KEY = 'role';

export const Roles = (role: BaseRole[]) => SetMetadata(ROLE_KEY, role);