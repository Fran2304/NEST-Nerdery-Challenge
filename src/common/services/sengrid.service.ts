import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class SengridService {
  private readonly sendgridClient;
  constructor() {
    this.sendgridClient = sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendMailOfConfirmationCode(
    email: string,
    tokenEmail: string,
  ): Promise<void> {
    const msg = {
      to: email,
      from: 'diana@ravn.co',
      subject: 'Confirmation email to bookstore',
      text: `Link to confirm email: https://challenge-nest.herokuapp.com/confirm/${tokenEmail}`,
    };
    this.sendgridClient.send(msg);
  }
}
