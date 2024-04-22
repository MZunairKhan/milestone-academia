import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as nodemailer from 'nodemailer';
import { EventMessagesEnum } from '../../common/enums/event-messages.enum';
import { LoggerService } from 'apps/api/src/logger/logger.service ';
import { LoggerEnum } from 'apps/api/src/logger/logging.enum';
import { LoggingMessages } from 'apps/api/src/assets/logging-messages';

@Injectable()
export class EmailService {
  constructor(private readonly logger: LoggerService) {}
  infoLog(methodName: string ,  message: string){
    const log =  {
      className: EmailService.name,
      methodName: methodName ,
      message: message,
      level: LoggerEnum.Info
    }
    this.logger.info(log)
    this.logger.saveLog(log)
   }

   errorLog(methodName: string ,  message: string , error: any, stackTrace: any){
    const log =  {
      className: EmailService.name,
      methodName: methodName ,
      message: message,
      error: error,
      stackTrace: stackTrace
    }
    this.logger.error(log);
   }

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

      this.infoLog(EmailService.prototype.sendEmail.name,
        LoggingMessages.email.info.emailSentSuccessfully(email))
      return {
        success: true,
        message: `Email sent to ${email} successfully`,
      };
    } catch (error) {
      this.errorLog(EmailService.prototype.sendEmail.name,
        LoggingMessages.email.error.emailFailure(email),error,'')
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
