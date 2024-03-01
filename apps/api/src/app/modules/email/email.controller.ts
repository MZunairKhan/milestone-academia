import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';

@ApiTags('Email')
@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async create(@Body() emailData: { email: string }) {
    const { email } = emailData;
    const res = await this.emailService.sendEmail(email);
    return res;
  }
}
