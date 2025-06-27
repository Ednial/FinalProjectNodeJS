import nodemailer, { Transporter } from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';
import pug from 'pug';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export class EmailService {
  private transporter: Transporter;

  constructor(
    mailerService: string,
    mailEmail: string,
    senderEmailPassword: string,
    private readonly postToProvider: boolean
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailEmail,
        pass: senderEmailPassword,
      },
    });
  }

  async sendEmail(options: SendEmailOptions) {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        //attachments: attachments
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async sendConfirmationEmail(
    to: string,
    name: string,
    confirmationUrl: string
  ) {
    const htmlBody = pug.renderFile(
      'src/presentation/common/templates/confirmation.pug',
      { name, confirmationUrl }
    );
    return this.sendEmail({
      to,
      subject: 'Confirm your email',
      htmlBody,
    });
  }
}
