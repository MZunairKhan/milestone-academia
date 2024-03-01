import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendEmail(email: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: 'mhsharif@bytecloudsolutions.com',
        pass: 'Mhs@2024',
      },
    });

    //get current data and time for email

    function getCurrentDateTime() {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', options);

      return formattedDate;
    }

    const currentDateTime = getCurrentDateTime();

    const htmlTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <style>
          body {
              font-family: Arial, sans-serif;
              padding: 20px;
          }
  
          .logo {
              text-align: center;
          }
  
          .logo img {
              height: 100px;
              border-radius: 10%;
          }
  
          .colorful-line {
              margin-top: 30px;
              margin-bottom: 30px;
              width: 100%;
              height: 20px;
              background: linear-gradient(45deg, #ff8c00, #000000);
              border-radius: 10px;
          }
  
          .email-container {
              width: 520px;
              margin: auto;
          }
  
         
  
          .dateAndTime {
              font-size: smaller;
              font-weight: 10;
              float: right;
              padding-right: 10px;
          }
  
          .message {
              font-size: 20px;
              color: #030303;
          }
  
          .buttonContainer {
              text-align: center;
              margin-top: 30px;
          }
  
          .visitButton {
              background: #ff8c00;
              color: aliceblue;
              width: 150px;
              height: 30px;
              border-radius: 10%;
              border: none;
              cursor: pointer;
          }
      </style>
  </head>
  <body>
  <div class="email-container">
      <div class="logo">
          <img src="https://milestoneacademia.com/wp-content/uploads/2024/02/Milestone_Academia2-removebg-preview-removebg-preview.png" alt="Logo"/>
      </div>
      <div class="colorful-line"></div>
      <div class="message">
          <div class="welcomeAndDate">
              <span>Hi!</span>
              <span class="dateAndTime">${currentDateTime}</span>
          </div>
          <p>Welcome to MileStone Academia.</p>
          <p>We are thrilled to have you on board!</p>
      </div>
      <div class="buttonContainer">
          <a href="https://milestoneacademia.com" target="_blank" style="text-decoration: none; color: black;">
              <button class="visitButton">Visit Site</button>
          </a>
      </div>
  </div>
  </body>
  </html>
  
`;

    const mailOptions = {
      from: 'mhsharif@bytecloudsolutions.com',
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

  @OnEvent('created')
  EmailNewUser(payload: { email: string }) {
    this.sendEmail(payload.email);
  }
}
