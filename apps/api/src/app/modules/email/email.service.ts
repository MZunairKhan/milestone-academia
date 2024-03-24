import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as nodemailer from 'nodemailer';
import { EventMessagesEnum } from '../../common/enums/event-messages.enum';

@Injectable()
export class EmailService {
  async sendEmail(email: string, htmlTemplate: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: 'info@milestoneacademia.com',
        pass: 'msaKAZK@24',
      },
    });

    const mailOptions = {
      from: 'info@milestoneacademia.com',
      to: email,
      subject: 'Welcome',
      text: 'Hi Welcome to MileStone Academia',
      html: htmlTemplate,
    };
    try {
      await transporter.sendMail(mailOptions);
      return {
        success: true,
        message: `Email sent to ${email} successfully`,
      };
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }

  @OnEvent(EventMessagesEnum.UserCreated)
  EmailNewUser(payload: { email: string , htmlTemplate: string }) {
    this.sendEmail(payload.email, payload.htmlTemplate);
  }

  @OnEvent(EventMessagesEnum.ForgotPassword)
  ForgotPassword(payload: { email: string , htmlTemplate: string}) {
    this.sendEmail(payload.email, payload.htmlTemplate);
  }
}
