import { PartialType } from '@nestjs/mapped-types';

import { MCQS } from '../entities/mcqs.entity';

export class UpdateMcqsDto extends PartialType(MCQS) {}
