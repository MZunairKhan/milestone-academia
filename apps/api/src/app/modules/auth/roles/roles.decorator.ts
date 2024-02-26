
import { SetMetadata } from '@nestjs/common';
import { BaseRole } from './roles.enum';

export const ROLE_KEY = 'role';

export const Roles = (role: BaseRole[]) => SetMetadata(ROLE_KEY, role);